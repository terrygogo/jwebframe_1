<template>
  <q-layout ref="layout" view="lHh Lpr lFf" v-if="$auth.ready()">
    <q-layout-header>
      <q-toolbar>
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title class="uppercase">
          CoreBridge
          <span slot="subtitle"> Web Manger / V2.1.1 for Linux </span>
        </q-toolbar-title>
        <q-btn flat @click="$router.push('/dashboard')">
          <q-icon name="web" />
        </q-btn>
        <q-btn flat>
          <q-icon name="directions_run" />
          <q-popover ref="popover2">
            <q-list link separator class="scroll" style="min-width: 100px">
              <q-item to="/cservices">
                <q-item-main label="CoreBridge" sublabel="Trace CoreBridge Activities" />
              </q-item>
              <q-item to="/sservices">
                <q-item-main label="System" sublabel="View Server Resource" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
        <q-btn flat @click="$router.push('/events')">
          <q-icon name="report_problem" />
        </q-btn>
        <q-btn flat>
          <q-icon name="apps" />
          <q-popover ref="popover3">
            <q-list link separator class="scroll" style="min-width: 100px">
              <q-item to="/widget_logview">
                <q-item-main label="logs" sublabel="Log View" />
              </q-item>
              <q-item to="/widget_fileupload">
                <q-item-main label="파일업로드" sublabel="File Upload" />
              </q-item>
              <q-item to="/widget_filedownload">
                <q-item-main label="파일다운로드" sublabel="File Download" />
              </q-item>
              <q-item to="/widget_fileview">
                <q-item-main label="파일 보기" sublabel="File View" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
        <q-btn flat @click="$router.push('/settings')">
          <q-icon name="settings" />
        </q-btn>
        <div>
        </div>
        <div>
          <router-link v-if="!$auth.check()" to="/login" id="loginlabel" style="color: white;">Login</router-link>
          <a v-if="$auth.check()" @click="logout" style="color: white;">Logout</a>
        </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2" side="left">
      <div id="draa">
        <q-toolbar no-border color="white" slot="header" class="flex inline  shadow-7 justify-center">
          <div>
            <img src="~assets/cb_logo_r.png" style="max-width:100%; max-height:30px;">
          </div>
        </q-toolbar>

        <template v-for="(menu_item, index) in menus">
          <q-list-header v-if="menu_item.type=='just_label'" :key=index>{{menu_item.name}}</q-list-header>
          <q-item inset-separator item v-else-if="menu_item.type=='self_worker'" :key=index :to="menu_item.target">
            <q-item-side :icon="menu_item.icon" />
            <q-item-main :label="menu_item.name" :sublabel="menu_item.id" />
          </q-item>
          <q-collapsible inset-separator v-else-if="menu_item.type=='group_leader'" :key=index indent dense :icon="menu_item.icon"
            :label="menu_item.name" :sublabel="menu_item.id">
            <div class="scroll" style="max-height: 400px">
              <q-item inset-separator item v-for="(competition, index1) in menu_item.competitions" :key=index1 :to="competition.target"
                exact>
                <q-item-side :icon="competition.icon" />
                <q-item-main :label="competition.name"> </q-item-main>
              </q-item>
            </div>
          </q-collapsible>
        </template>
      </div>
    </q-layout-drawer>

    <q-page-container >
      <div class="row justify-between q-mt-md q-ml-sm q-mr-sm" >
          <q-breadcrumbs separator="/" active-color="secondary" color="light" >
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el v-if="!($route.name=='Home')" :to="$route.name" :label="$route.meta.label" />
          </q-breadcrumbs>
        <div  >   <q-icon name="access_time" /> {{ headerinfo.now}} </div>
    </div>
      <router-view ref="current_router_view"/>
    </q-page-container>
    <q-layout-footer>
      <!-- Navigation for iOS theme -->
      <nav-tabs v-if="$q.theme === 'ios'" />
      <q-toolbar>
        <q-toolbar-title>
          <span slot="subtitle">JionLab Co.,LTD 2018 (주)지온공작소</span>
        </q-toolbar-title>
        <q-btn flat @click="toggleFullscreen">
          <q-icon name="fullscreen" />
        </q-btn>
      </q-toolbar>
    </q-layout-footer>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="primary"
      >
        <q-fab-action @click.native="AddWidgetDialogPop" color="blue" class="white" icon="apps" />
        <q-fab-action @click="SaveDashBoardDragCoordi('저장합니다')" color="blue" class="white" icon="save" />
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import { openURL, date } from 'quasar'
let timeStamp = Date.now()
let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: true,
      headerinfo: {
        group: '모니터',
        menu: 'home',
        sub: this.$route.path,
        now: formattedString
      },
      menus: this.$store.state.cbmClient.drawerMenu
    }
  },
  methods: {
    openURL,
    toggleFullscreen () {
      this.$q.fullscreen.toggle()
    },
    SaveDashBoardDragCoordi (msg) {
      if (this.$route.name !== 'Dashboard') {
        this.$q.notify({
          type: 'positive',
          message: 'Only Dashboard Layout can save'
        })
      } else {
        var bb = this.$refs.current_router_view.layout
        this.apply_float_settings(bb)
      }
    },
    apply_float_settings (obj) {
      var that = this
      this.$axios
        .post('/json/dashboardcordi.json', obj)
        .then(function (response) {
          that.$q.notify({
            type: 'positive',
            message: 'Dashboard Layout Saved'
          })
        })
        .catch(function (error) {
          error = !error
          // console.log(error)
        })
    },
    AddWidgetDialogPop () {
      this.$q.dialog({
        title: '위젯을 추가합니다',
        message: '고르세염.',
        options: {
          type: 'checkbox',
          model: [],
          items: [
            { label: 'View Process Info', value: '/api/processess', color: 'secondary' },
            { label: 'View Network Info', value: '/api/connectstat' },
            { label: 'View Service Info', value: '/api/services3' }
          ]
        },
        cancel: true,
        preventClose: true,
        color: 'secondary'
      })
        .then(data => {
          this.$q.notify(`You selected: ${JSON.stringify(data)}`)
          this.$store.commit('cbmClient/addWidget', 'akakak')
          /*
          var bb = this.$refs.current_router_view.layout
          bb.push({
            x: 0,
            y: 0,
            w: 2,
            h: 12,
            i: '100',
            ref: 'babo',
            api: data[0],
            comp_type: 'card-state-table',
            title: 'process info',
            refresh_period: 10000,
            scroll_height: 80
          }) */
        })
    },
    logout () {
      this.$auth.logout({
        redirect: 'Home',
        makeRequest: false
        // params: {},
        // success: function () {},
        // error: function () {},
        // etc...
      })
      // console.log('logout')
    }
  },
  mounted () {
    /* when restart logout first must do this alert!!!!
    this.$auth.logout({
      redirect: 'Home',
      makeRequest: false
    })
    */
    setInterval(() => {
      let timeStamp = Date.now()
      this.headerinfo.now = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    }, 5024)
  }
}
</script>

<style>

</style>
