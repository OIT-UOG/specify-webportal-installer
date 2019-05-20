<template>
  <div class="search">
    <input v-model="searchQuery" placeholder=" Search all fields">

    <div class="button">

      <!-- <strong>{{ searchIndicator }}</strong> -->
      <div class="col-md-3 col-sm-3 col-xs-6 but-cont">
        <a href="#" class="btn btn-sm animated-button thar-two">{{ searchIndicator }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SimpleSearch',
  data () {
    return {
      searchQuery: '',
      isTyping: false,
      isLoading: false,
    }
  },
  computed: {
    searchIndicator () {
      if (this.isLoading) {
        return 'loading'
      } else if (this.isTyping) {
        return 'search'
      }
      return 'search'
    },
    ...mapGetters(['moreToQuery'])
  },
  watch: {
    searchQuery () {
      this.isTyping = true
      this.doSearch()
    }
  },
  methods: {
    doSearch: _.debounce(async function() {
      this.isLoading = true
      this.newSearchTerm(this.searchQuery)
      await this.runNewQuery()
      this.isTyping = false
      this.isLoading = false
    }, 100),
    ...mapActions(['newSearchTerm', 'runNewQuery'])
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.search input {
  margin: 5% 0% 5% 0%;
  width: 80%;
  height: 40px;
  font-size: 1.25em;
  border: solid 1px rgb(170, 169, 169);
}
.search input:focus {
  outline-width: 0;
  /* border: solid 1px rgb(83, 83, 83); */
}
.search input::placeholder {
  color: rgb(221, 219, 219);
}
.button {
  margin-bottom: 2%;
}


.but-cont {
  height: 30px;
  margin-bottom: 5%;
}
a.animated-button {
  width: 8%;

}

/* Global Button Styles */
a.animated-button:link, a.animated-button:visited {
	position: relative;
	display: block;
	margin: 0px auto 0;
	padding: 8px 15px;
	color: rgb(112, 112, 112);
	font-size:14px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	letter-spacing: .08em;
	border-radius: 0;
	text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}
a.animated-button:link:after, a.animated-button:visited:after {
	content: "";
	position: absolute;
	height: 0%;
	left: 50%;
	top: 50%;
	width: 150%;
	z-index: -1;
	-webkit-transition: all 0.75s ease 0s;
	-moz-transition: all 0.75s ease 0s;
	-o-transition: all 0.75s ease 0s;
	transition: all 0.75s ease 0s;
}
a.animated-button:link:hover, a.animated-button:visited:hover {
	color: #rgb(112,112,112);
	text-shadow: none;
}
a.animated-button:link:hover:after, a.animated-button:visited:hover:after {
	height: 450%;
}
a.animated-button:link, a.animated-button:visited {
	position: relative;
	display: block;
	margin: 0px auto 0;
	padding: 8px 15px;
	color: #rgb(112,112,112);
	font-size:14px;
	border-radius: 0;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	letter-spacing: .08em;
	text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}


a.animated-button.thar-two {
	color: #rgb(112,112,112);
	cursor: pointer;
	display: block;
	position: relative;
	border: 2px solid rgb(224, 105, 75, .8);
	transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
a.animated-button.thar-two:hover {
	color: #fff !important;
	background-color: transparent;
	text-shadow: ntwo;
}
a.animated-button.thar-two:hover:before {
	top: 0%;
	bottom: auto;
	height: 100%;
}
a.animated-button.thar-two:before {
	display: block;
	position: absolute;
	left: 0px;
	bottom: 0px;
	height: 0px;
	width: 100%;
	z-index: -1;
	content: '';
	color: #000 !important;
	background: rgb(224, 105, 75, .8);
	transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
</style>
