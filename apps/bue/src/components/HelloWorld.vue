<template>
  <div id="result-list">
    <table>
      <thead></thead>
      <tbody>
        <tr v-for="row of ResultStore.entries" :key="row.spid">
          <td v-for="f of ResultStore.fields">
            {{ row[f] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ResultStore from '../stores/ResultStore'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ResultStore: ResultStore.data
    }
  }
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
</style>
