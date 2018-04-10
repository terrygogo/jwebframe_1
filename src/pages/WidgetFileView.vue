<template>
  <q-page padding>
    <!-- content -->
    <q-collapsible group="somegroup" opened icon="cloud" label="Google Drive">
      <q-card>
        <q-card-main class="row gutter-xs">
          <div class="col">
            <q-table title="miminana@gmail.com" :data="model_list" :columns="columns" row-key="id" selection="single" :selected.sync="selected_model">
              <template slot="top-right" slot-scope="props">
                <q-btn color="positive" flat round delete icon="refresh" @click="refreshModel" />
              </template>
            </q-table>
          </div>
          <div class="col" v-if="model">
            <q-card>
  <q-card-title>
    {{model.name}}
  </q-card-title>
  <q-card-separator />
  <q-card-main>
      <q-scroll-area style="width: 400px; height: 500px;">
       <div v-html="content">
  </div>
            </q-scroll-area>
  </q-card-main>
</q-card>
          </div>
        </q-card-main>
      </q-card>
    </q-collapsible>
  </q-page>
</template>

<script>
/* global gapi */
export default {
  // name: 'PageName',
  data () {
    return {
      table_select_idx: 0,
      selected_model: [],
      content: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: '파일이름',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'id',
          required: true,
          label: 'id',
          align: 'left',
          field: 'id',
          sortable: true
        }
      ],
      model_list: []
    }
  },
  computed: {
    model: function () {
      return this.selected_model[this.table_select_idx]
    }
  },
  mounted: function () {
    let ckeditor = document.createElement('script')
    ckeditor.setAttribute('src', 'https://apis.google.com/js/api:client.js')
    document.head.appendChild(ckeditor)
  },
  methods: {
    refreshModel () {
      var CLIENT_ID =
        '559012310439-48d8cpk0sdfcumernjri8q7ij9svvlji.apps.googleusercontent.com'
      var API_KEY = 'AIzaSyBVZ3HI9Fdz7Dva5CuijamOAG8hd3M-jcQ'
      var DISCOVERY_DOCS = [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ]
      var SCOPES = 'https://www.googleapis.com/auth/drive.readonly'
      var that = this
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
        .then(function () {
          // Listen for sign-in state changes.
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(that.updateSigninStatus)
          // Handle the initial sign-in state.
          that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
          gapi.auth2.getAuthInstance().signIn()
        })
    },
    updateSigninStatus (isSignedIn) {
      if (isSignedIn) {
        var that = this
        gapi.client.drive.files
          .list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)'
          })
          .then(function (response) {
            // appendPre('Files:');
            // debugger
            var files = response.result.files
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                // var file = files[i]
                that.model_list.push({ id: files[i].id, name: files[i].name })
              }
              debugger
              var thot = that
              gapi.client.drive.files.export(
                {
                  fileId: '1RNXOn4tLvyS6f3o7BGdx3M0riMSaqaBm1FVhmSUgKX8',
                  mimeType: 'text/html'
                }).then(function (response) {
                debugger
                thot.content = response.body
              }).catch(function (connErr) {
                console.log('Error in database connection: ' + connErr)
              })
            }
          })
      } else {
      }
    },
    exportSelectedGDDocs () {
      var thot = this
      gapi.client.drive.files.export(
        {
          fileId: this.model.id,
          mimeType: 'text/html'
        },
        {
          responseType: 'stream'
        },
        function (err, response) {
          debugger
          if (err) return console.log(err)
          response.data
            .on('error', err => {
              console.log(err)
            })
            .on('end', () => {
              thot.content = response.data
              console.log('success')
              return response.data
            })
        }
      )
    }
  }
}
</script>

<style>

</style>
