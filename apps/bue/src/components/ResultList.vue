<template>
  <div id="result-list">
    <table>
      <thead></thead>
      <tbody>
        <tr v-if="entries.length > 0">
          <th v-for="f of visibleCols">
            {{ f.colname }}
          </th>
        </tr>
        <tr v-for="row of entries">
          <td v-for="f of visibleCols">
            {{ row[f.solrname] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResultList',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['moreToQuery', 'entries', 'numFound', 'colAttrs', 'visibleCols'])
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
tr:nth-child(even) {
  background-color: #e8edf1
}

tr, th {
  white-space: nowrap;
}
th {
  padding: 0 5px;
}
</style>
