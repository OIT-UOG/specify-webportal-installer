$(document).ready(function() {
	$('#mainsearch').select2({
		ajax: {
			url: function (params) {
				return 'specify-solr/' + $('#collectionchoice').val().split('|')[0] + '/select'
			},
			dataType: 'json',
			delay: 250,
			data: function (params) {
				var results_per_page = 20;
				var query = {
					// indent: 'on',
					// version: 2.2,
					// fq: null,
					// rows: 50,
					// fl: "*%2Cscore",
					// qt: null,
					wt: 'json',
					// explainOther: null,
					// 'hl.fl': null,

					q: '*' + params.term + '*',

					// paging
					page: params.page || 1,
					start: ((params.page || 1)-1) * results_per_page,
					rows: results_per_page
				}
				return query
			},
			processResults: function (data, params) {
				// http://localhost/specify-solr/fishvouchers/select?wt=json&q=s*&rows=2&start=2	
				/*
				    {
					  "responseHeader": {
					    "status": 0,
					    "QTime": 0,
					    "params": {
					      "start": "2",
					      "q": "s*",
					      "wt": "json",
					      "rows": "2"
					    }
					  },
					  "response": {
					    "numFound": 897,
					    "start": 2,
					    "docs": [
					      {
					        "spid": "5",
					        "cn": 5,
					        "ac": "UG-NMFS-000148",
					        "de": "Chlorurus microrhinos (current) ",
					        "ph": "Chordata",
					        "cl": "Actinopterygii",
					        "or": "Perciformes",
					        "fa": "Scaridae",
					        "ge": "Chlorurus",
					        "fn": "Chlorurus microrhinos",
					        "au": "(Bleeker, 1854)",
					        "co": "Guam",
					        "ln": "NCS Beach",
					        "sf": "GFB-148",
					        "sd": 2011,
					        "contents": "5\tUG-NMFS-000148\tChlorurus microrhinos (current) \tChordata\tActinopterygii\tPerciformes\tScaridae\tChlorurus\tChlorurus microrhinos\t(Bleeker, 1854)\tGuam\tNCS Beach\tGFB-148\t2011\t",
					        "img": "[{AttachmentID:818,AttachmentLocation:\"sp67778837866648190333.att.JPG\",Title:\"5a.JPG\"}, {AttachmentID:819,AttachmentLocation:\"sp65876616012981620471.att.JPG\",Title:\"5b.JPG\"}]"
					      }, 
					      ...
					    ]
					  }
					}
				*/
				window.rdj = data;
				var resp = data.response;
				var results = resp.docs;
				var rows = +data.responseHeader.params.rows
				results = $.map(results, function(item) {
					return new ResultItem(item)
				})
				params.page = params.page || 1;
				var ret = {
					results: results,
					pagination: {
						more: (resp.start + rows) < resp.numFound
					}
				};
				return ret;
			},
			cache: true
		},
		width: 'resolve',
		placeholder: "Search",
		minimumInputLength: 1,
		escapeMarkup: function (markup) { return markup; },
		templateResult: formatEntry,
  		templateSelection: formatEntrySelection,
  		tags: true,
  		createTag: function (params) {
  			var term = $.trim(params.term)
  			if (term === '') {
  				return null
  			}
  			return new ResultItem({
  				id: term,
  				text: term,
  				newTag: true
  			})
  		}
	});
	$('#mainsearch').on('select2:select', function(e) {
		var url = 'specify-solr/'
		url += e.params.data.collection + '/?q='
		url += encodeURIComponent(e.params.data.search_term)
		window.open(url, '_blank')
		$('#mainsearch').val(null).trigger('change');
	})
});

class ResultItem {
	constructor(item) {
		this.raw = item
		this.id = item.id || item.spid;
		this.text = item.text || item.fn;
		this.search_term = '*' + this.text + '*'

		var coll = $('#collectionchoice').val().split('|')
		this.collection = coll[0]

		this.author = item.au
		this.city = item.ln
		this.country = item.co
		this.date_collected = item.sd

		if (item.img) {
			var imgs = parseNonStrictJson(item.img)

			this.imgs = imgs;
			this.first_img = imgs[0];
			// TODO: get image server url from elsewhere?
			// until we figure out how to get this info from solr's settingsStore
			if (this.collection === 'diatomvouchers') {
				this.img_url_prefix = 'http://specifyimage2.uog.edu:8080/fileget?coll=University+of+Guam+Herbarium&type=T&scale=100&filename='
			} else {
				this.img_url_prefix = 'http://specifyimage.uog.edu:8080/fileget?coll=UOG+Fish+Vouchers+Collection&type=T&scale=100&filename='
			}
		} else {
			this.imgs = []
			this.first_img = {'AttachmentLocation': coll[1]}
			this.img_url_prefix = 'images/collections/'
		}
		if (item.newTag) {
			this.newTag = true
		}
	}
}

function filterJoin(arr, sep, test) {
	test = test || Boolean
	sep = sep || ', '
	return arr.filter(test).join(sep)
}

function formatEntry (entry) {
	if (entry.loading) {
		return entry.text;
	}

	var markup;
	if (entry.newTag) {
		markup = 
			"<div class='search-entry clearfix'>" +
				"<div class='search-entry-title search-entry-term'>search for " + entry.search_term + "</div>" + 
			"</div>";
	} else {
		var img = entry.img_url_prefix + entry.first_img.AttachmentLocation
		var num_images = entry.imgs.length
		var title = filterJoin([entry.text, entry.au], ' ')
		var location = filterJoin([entry.ln, entry.co], ', ')
		var date_collected = entry.sd
		var desc = filterJoin(['Collected:' ,location, date_collected], ' ')
		var has_qeo_coords // ?
		
		markup = 
			"<div class='search-entry clearfix'>" +
				"<div class='search-entry-img'><img src='" + img + "' /></div>" +
				"<div class='search-entry-meta'>" + 
					"<div class='search-entry-title'>" + title + "</div>" + 
					"<div class='search-entry-description'>" + desc + "</div>" + 
					"<div class='search-entry-stats'>" + "</div>" + 
				"</div>" +
			"</div>";
	}
	return markup;
}

function formatEntrySelection (entry) {
	return entry.text;
}

function parseNonStrictJson(value) {
  var correctQuotes, quoting, valueWithQuotes, alreadyQuoted;
  quoting = false;
  alreadyQuoted = false;
  correctQuotes = function(memo, nextChar) {
  	if (alreadyQuoted) { 
  		if (nextChar === '"') { alreadyQuoted = false }
  	} else {

	  	var isSyntax = /[{}\[\],: ]/.test(nextChar);
  		if (!quoting) {
  			if (nextChar === '"') { 
  				alreadyQuoted = true 
  			} else if (!isSyntax) {
  				memo += '"'
  				quoting = true
  			}
  		} else {
  			if (isSyntax) {
  				memo += '"'
  				quoting = false
  			}
  		}
  	}
  	return memo + nextChar
  };
  valueWithQuotes = value.split('').reduce(correctQuotes)
  return JSON.parse(valueWithQuotes);
};


// -- reduce polyfill --

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}