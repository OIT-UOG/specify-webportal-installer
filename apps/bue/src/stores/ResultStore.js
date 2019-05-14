const cache = {
  query_list: {}, // { cachable_query_url: [ spids of results }
  result_list: {} // { collection: { spid: { fields } } }
};

class Image {
  constructor (collection, id, location, title) {
    this.id = id;
    this.location = location;
    this.title = title;
    this.filename = location;
    this.old_name = title;
    this.collection = collection;
  }
}

const ROWS_PER_QUERY = 500;
// what should the default rows be?
// could make it high and lazy-load the images.

class Query {
  constructor (collections, queryTerms = ['*'], params = {}) {
    this.collections = collections;
    this.qs = (queryTerms.constructor === Array) ? queryTerms : [queryTerms];
    this.params = {
      rows: ROWS_PER_QUERY,
      page: 0, // nextPage/setPage() check prev page's cache for numFound. return null or something if no more pages
      start: 0,
      ...params
    };
    this.ran = false;
    this.numFound = {};
  }
  get urls () { // url "hashes". duplicate queries must give same url for caching
    return this.collections.reduce((res, c) => {
      res[c] = this._hashUrl(c);
    }, {});
  }
  get qUrlParam () {
    return encodeURIComponent([...this.qs].sort().join(' AND '));
  }
  get urlParams () {
    let params = {...this.params};
    return [
      this.qUrlParam,
      ...Object.keys(params).sort().map(
        key => encodeURIComponent(`${key}:${params[key]}`)
      )
    ].join('&');
  }
  _hashUrl (collection) {
    return `${collection}/select?${this.urlParams}`;
  }
  async quickFetch () { // fetch or get from cache
    let urls = this.urls; // hmm promise all including cache
    let responses = await Promise.all(Object.keys(urls).map(async (coll) => {
      let lastPage = this.lastPageNumber(coll);
      if (this.params.page > lastPage) {
        return null;
      }

      let url = urls[coll];
      let resp = this.buildResponseFromCache(url);
      if (!resp) {
        // return null if no more pages
        let raw = await fetch(url);
        resp = this.processResponse(coll, await raw.json());
        this.putResponseInCache(url, coll, resp);
      }
      this.numFound[coll] = resp.numFound;
      return resp;
    }));
    this.ran = true;
    return responses;
  }
  putResponseInCache (url, coll, resp) {
    let cacheObj = JSON.parse(JSON.stringify(resp)); // copy

    cacheObj.docs = cacheObj.docs.map(doc => {
      cache.result_list[coll][doc.spid] = doc;
      return doc.spid;
    });
    cache.query_list[url] = cacheObj;
  }
  buildResponseFromCache (url) {
    if (url in cache.query_list) {
      let cacheObj = JSON.parse(JSON.stringify(cache.query_list[url]));

      cacheObj.docs = cacheObj.docs.map(spid => {
        return cache.result_list[cacheObj.collection][spid];
      });
      return cacheObj;
    } else {
      return null;
    }
  }
  processResponse (collection, r) {
    if ('facet_counts' in r) {
      r.response.facet_counts = r.facet_counts;
    }
    r = r.response;
    r.docs = r.docs.map(doc => {
      if ('img' in doc) {
        doc.img = _parseImages(collection, doc.img);
      }
      return doc;
    });
    r.collection = collection;
    return r;
  }
  _parseImages (collection, imgsString) {
    let inObject = false;
    let inString = false;
    let inKey;
    let imgs = [];
    let current;
    let keyBuffer;
    let valueBuffer;
    let keyDict = {
      AttachmentID: 'id',
      AttachmentLocation: 'location',
      Title: 'title'
    };
    for (let i = 0; i < imgsString.length; i++) {
      let c = imgsString.charAt(i);
      if (!inObject) {
        if (c === '{') {
          inObject = true;
          inKey = true;
          keyBuffer = '';
          valueBuffer = '';
          current = {};
        }
      } else {
        if (!inString) {
          if (c === '}' || c === ',') { // value end
            if (keyBuffer in keyDict) {
              current[keyDict[keyBuffer]] = valueBuffer;
            }
            keyBuffer = '';
            valueBuffer = '';
          }
          if (c === '}') { // object end
            inObject = false;
            if (current) {
              imgs.push(new Image(collection, current.id, current.location, current.title));
              current = undefined;
            }
            continue;
          } else if (c === ':') { // key end
            inKey = false;
            continue;
          } else if (c === ',') { // value end but not object end
            inKey = true;
            continue;
          } else if (c === '"') { // string start
            inString = true;
            continue;
          } else if (c === ' ') {
            continue;
          }
        }
        if (c === '"') {
          inString = false;
        } else {
          if (inKey) {
            keyBuffer += c;
          } else {
            valueBuffer += c;
          }
        }
      }
    }
    return imgs;
  }
  run () {

  }
  get hasGeoCount () {
    return this.params['facet'] === 'on';
  }
  get isCachable () {
    return !this.hasGeoCount;
  }
  isLastPage(coll) {
    return this.params.page === this.lastPageNumber(coll);
  }
  lastPageNumber (coll) {
    if (typeof this.numFound[coll] === 'undefined') {
      return null;
    }
    return Math.ceil(this.numFound[coll] / ROWS_PER_QUERY) - 1;
  }
  setPage (page) {
    // check cache here. { run: () => null } ?
    // return null if no more pages
    let nextQuery = this.addParams({
      rows: this.params.rows,
      page: page,
      start: this.params.rows * page
    });
    if (this.numFound) {
      nextQuery.info.numFound = this.numFound;
    }
    return nextQuery;
  }
  nextPage () {
    return this.setPage(this.params.page + 1);
  }
  prevPage () {
    return this.setPage(Math.max(0, this.params.page - 1));
  }
  more () {

  }
  _qTerm (name, search, endSearch) {
    let term = `${name}:`;
    if (typeof endSearch === 'undefined') {
      term += search;
    } else {
      term += `[${search} TO ${endSearch}]`;
    }
    return term;
  }
  _addQueryTerms (terms) {
    terms = (terms.constructor === Array) ? terms : [terms];
    return new Query(this.collections, [...this.qs, ...terms], this.params);
  }
  addTerm(name, search = '*', endSearch) {
    return this._addQueryTerms(this._qTerm(name, search, endSearch))
  }
  addParams (params) {
    return new Query(this.collections, this.qs, {...this.params, ...params});
  }
  setCollections (collections) {
    return new Query(collections, this.qs, this.params);
  }
  imagesOnly () {
    return this.addTerm('img');
  }
  geoOnly () {
    return this.addTerm('l1', -180, 180).addTerm('l11', -180, 180);
  }
  geoCounts () {
    return this.addParams({
      facet: 'on',
      'facet.field': 'geoc',
      'facet.limit': -1,
      'facet.mincount': 1
    });
  }
}

async function scrapeCollections () {
  let raw = await fetch('/specify-solr/');
  let text = await raw.text();

  return [...text.matchAll(/<li><a href="(.*?)"/g)].map(r => r[2]);
}

// oops, this is a regular object, not a Vue object.
// we'll need to move the querying and all this to a separate component.
// might need to rewrite this using Vuex instead of this const data store
const ResultStore = {
  data: {
    fields: [
      'spid', 'num'
    ],
    entries: [
      {spid: 2, num: 1},
      {
        spid: 3,
        num: 4
      }
    ],
    caches: [
      // collection: [ cachable_query_url: [ spids of results ] ]
    ],
    spid_cache: [
      // collection: { spid: { fields } }
    ]
  },
  methods: {
    query: Query
  },
  async mounted () {
    this.collections = await scrapeCollections();
    this.collectionsReady = true;
  }
};

export default ResultStore
