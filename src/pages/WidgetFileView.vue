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
                <div class="q-caption">{{model.id}}</div>
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <div id="vue-frame" class="row" style="height: 400px;">
                  <iframe :src="model.webViewLink" class="col-12"></iframe>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </q-card-main>
      </q-card>
    </q-collapsible>
        <q-collapsible group="somegroup" opened icon="cloud" label="Google Drive">
      <q-card>
        <q-card-main class="row gutter-xs">
          <div class="col">
            <q-uploader :url="url" auto-expand :send-raw="true"  :headers="daegari" @start="urlheader"/>
          </div>
        </q-card-main>
      </q-card>
    </q-collapsible>
  </q-page>
</template>

<script>
/* global gapi */
import VueFrame from 'vue-frame'
export default {
  // name: 'PageName',
  components: { VueFrame },
  data () {
    return {
      url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
      editable: true,
      gapiloaded: false,
      table_select_idx: 0,
      selected_model: [],
      daegari: {},
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
          name: 'modifiedTime',
          required: true,
          label: 'modifiedTime',
          align: 'left',
          field: 'modifiedTime',
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
      model_list: [],
      model: null
    }
  },
  watch: {
    selected_model: function (val) {
      this.getSelectedGDDocs(this.selected_model[0].id)
    }
  },
  computed: {
    oldmodel: function () {
      return this.selected_model[this.table_select_idx]
    }
  },
  created: function () {
    let ckeditor = document.createElement('script')
    ckeditor.setAttribute('src', 'https://apis.google.com/js/api:client.js')
    document.head.appendChild(ckeditor)
  },
  methods: {
    urlheader () {
      // const contentType = file.type // To send the correct Content-Type
      // const fileName = file.name // If you want to use this value to calculate the S3 Key.
      this.daegari = { Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token }
    },
    async urlFactory (file) {
      // const contentType = file.type // To send the correct Content-Type
      // const fileName = file.name // If you want to use this value to calculate the S3 Key.
      this.daegari = { Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token }
      debugger
      return 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media'
    },
    refreshModel () {
      var CLIENT_ID =
        '559012310439-48d8cpk0sdfcumernjri8q7ij9svvlji.apps.googleusercontent.com'
      var API_KEY = 'AIzaSyBVZ3HI9Fdz7Dva5CuijamOAG8hd3M-jcQ'
      var DISCOVERY_DOCS = [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ]
      var SCOPES = 'https://www.googleapis.com/auth/drive.file'
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
          that.daegari = { Authorization: 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token }
        })
    },
    updateSigninStatus (isSignedIn) {
      if (isSignedIn) {
        var that = this
        gapi.client.drive.files
          .list({
            pageSize: 50,
            fields: 'nextPageToken, files(id, name, modifiedTime)',
            q: 'trashed != true'
          })
          .then(function (response) {
            // appendPre('Files:');
            // debugger
            var files = response.result.files
            if (files && files.length > 0) {
              that.model_list = []
              for (var i = 0; i < files.length; i++) {
                // var file = files[i]
                that.model_list.push({
                  id: files[i].id,
                  modifiedTime: files[i].modifiedTime,
                  name: files[i].name
                })
              }
              /*
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
              */
            }
          })
      } else {
      }
    },
    exportSelectedGDDocs () {
      var thot = this
      gapi.client.drive.files
        .export({
          fileId: thot.model.id,
          mimeType: 'test/html'
        })
        .then(function (response) {
          debugger
          thot.content = response.body
          return response.body
        })
        .catch(function (connErr) {
          console.log('Error in gapi export connection: ' + connErr)
        })
    },
    getSelectedGDDocs (id) {
      var thot = this
      gapi.client.drive.files
        .get({
          fileId: id,
          fields: '*'
        })
        .then(function (response) {
          thot.model = response.result
        })
        .catch(function (connErr) {
          console.log('Error in gapi get: ' + connErr)
        })
    }
  }
}
</script>

<style>

</style>
