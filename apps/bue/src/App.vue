<template>
  <div id="app">
    <img src="http://guamepscor.uog.edu/sites/default/files/epscor-logo-solid-final-cs6_-_guam_gec-400.png">
    <SimpleSearch/>
    <ResultList/>
  </div>
</template>

<script>
import SimpleSearch from './components/SimpleSearch'
import ResultList from './components/ResultList'

export default {
  name: 'App',
  components: {
    ResultList,
    SimpleSearch
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
