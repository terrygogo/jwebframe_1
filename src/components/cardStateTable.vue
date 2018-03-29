<template>
  <card-template :card-title="cardTitle" :base-color="baseColor" :icon-name="iconName" :what="what" :period="period" :id="id">
    <q-card-main class="card-content">
      <q-scroll-area  :style="styles">
        <q-table :data="results" :columns="columns" row-key="columns[0]" :pagination.sync="paginationControl" hide-bottom dense/>
      </q-scroll-area>
    </q-card-main>
  </card-template>
</template>

<script>
import cardTemplate from '../components/cardTemplate.vue'
export default {
  name: 'cardStateTable',
  props: ['what', 'baseColor', 'iconName', 'cardTitle', 'period', 'id', 'scrollHeight'],
  components: {
    cardTemplate
  },
  created () {
    var that = this
    this.$axios.get(this.what)
      .then(function (response) {
        that.results = response.data
        that.rows = Object.values(response.data)
        var xx = Object.keys(response.data[0])
        for (var i = 0; i < xx.length; i++) {
          that.columns.push({name: xx[i], label: xx[i], field: xx[i], align: 'left'})
        }
      })
    if (this.period > 0) {
      setInterval(() => {
        this.$axios.get(this.what)
          .then(function (response) {
            that.results = response.data
            that.rows = Object.values(response.data)
            // that.columns = Object.keys(response.data)
          // console.log(response)
          })
      }, this.period)
    }
  },
  computed: {
    styles: function () {
      // var height = 200
      return {
        height: this.scrollHeight + 'px'
      }
    }
  },
  watch: {
  },
  methods: {
    pre_check () {
      var xx
      for (xx in this.results) {
        if (typeof this.results[xx] !== 'object') {
          delete this.results[xx]
        }
      }
      return this.results
    }
  },
  data () {
    return {
      results: [],
      rows: [],
      columns: [],
      sc_height: this.scroll_height,
      paginationControl: { rowsPerPage: 0, page: 1 }
    }
  }
}
</script>

<style>
</style>
