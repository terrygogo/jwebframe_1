<template>
    <!-- content -->
  <q-page padding class="docs-table">
    <p class="caption">Pagination, sorting & filtering happens on the server</p>
    <q-table dense
      ref="table"
      color="primary"
      title="Server-side Pagination"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      :visible-columns="db_columns"
      selection="none"
      :selected.sync="selected"
      row-key="rowid"
      :pagination.sync="serverPagination"
      @request="loadDataInfo"
      :loading="loading"
    >
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>
      <template slot="top-right" slot-scope="props">
      <q-table-columns
        color="secondary"
        class="q-mr-sm"
        v-model="db_columns"
        :columns="columns"
      />
      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
      />
    </template>
       <q-td slot="body-cell-ts" slot-scope="props" :props="props">
    <q-chip small color="secondary">{{ props.value }}</q-chip>
  </q-td>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      columns: [],
      db_columns: [],
      filter: '',
      selected: [
        // initial selection
      ],
      loading: false
    }
  },
  methods: {
    tsformatter (val) {
      var d = new Date(0)
      d.setUTCSeconds(val)
      return d.toLocaleString()
    },
    request (props) {
      /*
      setTimeout(() => {
        this.serverPagination = props.pagination
        let
          table = this.$refs.table,
       rows = tableData.slice(),
          { page, rowsPerPage, sortBy, descending } = props.pagination
        if (props.filter) {
          rows = table.filterMethod(rows, props.filter)
        }
        if (sortBy) {
          rows = table.sortMethod(rows, sortBy, descending)
        }
        this.serverPagination.rowsNumber = rows.length
        if (rowsPerPage) {
          rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }
        this.serverData = rows
        this.loading = false
      }, 1500) */
    },
    loadDataInfo (props) {
      this.loading = true
      var that = this
      return this.$axios.get('api/getaccesslogqua', {params: {props}})
        .then(function (response) {
          that.serverData = response.data
          that.serverPagination = props.pagination
          that.loading = false
        })
    }
  },
  mounted () {
    this.loading = true
    var that = this
    this.$axios.get('api/getaccesslogqua_pre')
      .then(function (response) {
        that.serverPagination.rowsNumber = response.data
        that.$axios.get('api/getaccesslogqua_columns')
          .then(function (response) {
            var xx = Object.keys(response.data)
            var yy = Object.values(response.data)
            for (var i = 0; i < xx.length; i++) {
              if (yy[i].type === 'text') {
                that.columns.push({name: xx[i], label: xx[i], field: xx[i], align: 'left'})
              } else if (yy[i].type === 'datetime') {
                that.columns.push({name: xx[i], label: xx[i], field: xx[i], align: 'left', format: val => that.tsformatter(val)})
              } else {
                that.columns.push({name: xx[i], label: xx[i], field: xx[i], align: 'right'})
              }
            }
            that.db_columns = xx
          }).bind()
      })
    this.loadDataInfo({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>

<style>;
</style>
