<template>
  <q-page padding>
    <!-- content -->
    <q-list id="corebridgestatus_grid">
      <q-list-header>CoreBridge (망간자료전송서비스 현황) <q-btn-toggle
  v-model="gridview" class="float-right small" small dense
  toggle-color="primary"
  :options="[
    {label: 'grvid', value: true},
    {label: 'flex', value: false},
  ]"
/></q-list-header>
      <q-collapsible icon="explore" :label="serverLabel" opened>
        <q-window-resize-observable @resize="onResize" />
          <grid-layout v-if="gridview === true" :layout="layout" :auto-size="true" :col-num="12" :is-draggable="true" :is-resizable="true" :vertical-compact="true" :dragIgnoreFrom="ignorelist"
            :use-css-transforms="true" :row-height="30" :col-width="30" ref="GridLayout" @layout-updated="layoutUpdatedEvent" >
            <grid-item v-for="item in layout" :key='item.i' :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :min-w="2" :min-h="2" @resized="resizedEvent" drag-ignore-from=".no-drag">
              <component :is="item.comp_type" :card-title="item.title" base-color="bg-blue-5" icon-name="comment" :what="item.api" :period="item.refresh_period"
                :id="item.i" :scroll-height="item.scroll_height" :toPic="item.toPic">
              </component>
            </grid-item>
          </grid-layout>
          <div v-else class="row gutter-xs" >
            <div v-for="item in layout" :key='item.i' :class="colDefine(item.w)">
              <component class="q-mxy-xs" :is="item.comp_type" :card-title="item.title" base-color="bg-blue-5" icon-name="comment" :what="item.api" :period="item.refresh_period"
                :id="item.i" :scroll-height="item.scroll_height">
              </component>
            </div>
          </div>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
var VueGridLayout = require('vue-grid-layout')
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem
import cardStateList from '../components/cardStateList.vue'
import cardStateTable from '../components/cardStateTable.vue'
import cardSystemState from '../components/cardSystemState.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    GridLayout: GridLayout,
    GridItem: GridItem,
    cardStateList,
    cardStateTable,
    cardSystemState
  },
  data () {
    return {
      gridview: true,
      ignorelist: 'a, button, q-item',
      min_width: 2,
      layout: this.$store.state.cbmClient.dashboardLayout
    }
  },
  mounted () {
    // debugger
    // var obj = this.$data.layout[0]
    // obj.h = 8
    // var yy = this.$refs.gagaga.clientHeight
    // var xx = this.$refs.nanana.clientHeight
    // console.log('hama1 ' + yy)
    // console.log('hama2 ' + xx)
    // this.$refs.GridLayout.resizeEvent('resizeend', obj.i, obj.x, obj.y, obj.h, obj.w)
    // window.addEventListener('resize', this.handleResize)
    // this.layout = this.layout_init
    // var that = this
    // this.$store.watch((state) => state.cbmClient.dashboardLayout, () => {
    // this.layout = this.$store.getters.cbmClient.getDashboardLayout
    // })
    // this.layout = this.$store.state.cbmClient.dashboardLayout
    this.$axios
      .get('/json/dashboardcordi.json')
      .then(function (response) {
        if (response.data !== null) {
          // that.$store.state.cbmClient.dashboardLayout = response.data
          // that.$store.commit('cbmClient/updateDashboardLayout', response.data)
          // debugger
          // that.layout2 = that.layout
        }
        // that.$store.state.dashboardLayout = response.data
        // that.layout = that.$store.state.dashboard_layout
      })
      .catch(function (error) {
        alert('loading layout config fail:' + error)
        // console.log(error)
      })
    /*
    that.$nextTick(function () {
      var children = this.$refs.GridLayout.$children
      for (var i = 1; i < children.length; i++) {
        var x = children[i]
        var y = x.$el.clientHeight
        if (y !== 0) {
          if (that.layout != null) {
            if (that.layout[i - 1].h !== 0) {
              var happy = Math.round(y / 38)
              if (happy !== this.layout[i - 1].h) {
                that.layout[i - 1].h = happy
              }
            }
          }
        }
      }
    }) */
  },
  computed: {
    serverLabel () {
      // return this.$store.state.siteModel.server[0].IP
      return '감사합니다'
    },
    // setLayout () {
    // return this.$store.getters['cbmClient/getDashboardLayout']
    // },
    ...mapGetters('cbmClient', { setLayout: 'getDashboardLayout' }
    )
  },
  created () {
    // var that = this
    this.layout2 = JSON.parse(JSON.stringify(this.layout))
    setInterval(() => {
      // https://vuejs.org/guide/list.html#Mutation-Methods
      // this.dataset.unshift(this.dataset.pop())
      // this.dataset.push(this.getRandomInt())
      // console.log(this.dataset)
      // this.dataset.splice(0, 1)
      // this.dataset.push(this.getRandomInt())
    }, 5000)
  },
  ready: function () {
    // window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    // window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    colDefine (val) {
      return 'col-md-' + val + ' ' + 'col-xs-12'
    },
    onResize (event) {
      // console.log('Updated weeth: ', event)
      if (event.width < 576) {
        for (var i = 0; i < this.layout.length; i++) {
          this.layout[i].w = 12
          var hh = 0
          this.$refs.GridLayout.resizeEvent(
            'resizeend',
            this.layout[hh].i,
            this.layout[hh].x,
            this.layout[hh].y,
            this.layout[hh].h,
            this.layout[hh].w
          )
        }
      } else if (event.width >= 576) {
        // this.layout = JSON.parse(JSON.stringify(this.layout2))
      }
    },
    layoutUpdatedEvent: function (newLayout) {
      var that = this
      console.log('Updated layout: ', newLayout)
      var children = this.$refs.GridLayout.$children
      for (var i = 1; i < children.length; i++) {
        var x = children[i]
        // var x = children[mm]
        var y = x.$el.children[0].clientHeight
        // var y = x.$el.clientHeight
        if (y !== 0) {
          if (that.layout != null) {
            /* var ind = children[i].i
            /* var hh = this.layout.findIndex(x => x.i === ind)
            var kill = Math.ceil(y / 37)
            debugger
            if (this.layout[hh].h !== kill) {
              this.layout[hh].h = kill
              this.$refs.GridLayout.resizeEvent(
                'resizeend',
                this.layout[hh].i,
                this.layout[hh].x,
                this.layout[hh].y,
                this.layout[hh].h,
                this.layout[hh].w
              )
            }
            */
          }
        }
      }
    },
    resizedEvent: function (i, newH, newW, newHPx, newWPx) {
      // console.log(msg)
      var hh = this.layout.findIndex(x => x.i === i) // layout 에서 ID 인덱스 찾기
      this.layout[hh].scroll_height = newHPx - 60
      var children = this.$refs.GridLayout.$children
      var ndx = -1
      for (var j = 0; j < children.length; j++) { // 실제 children에서 해당 ID  찾기
        var mam = children[j].i
        if (mam === i) {
          ndx = j
        }
      }
      if (ndx > -1) {
        // var mm = ndx
        // var x = children[mm]
        // var y = x.$el.children[0].clientHeight
        // var kill = Math.round(y / 38)
        // this.layout[hh].h = kill // layout 거기에 바꾼 값 넣고 refresh by emit
        // this.layout[0].h = 135
        // this.$emit('resized', i, kill, newW, newHPx, newWPx)
        // this.eventBus.$emit('resizeEvent', 'resizeend', i, kill, newW, newHPx, newWPx)
      }
    }
  }
}
</script>

<style>

</style>
