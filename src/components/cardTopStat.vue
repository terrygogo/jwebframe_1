<template>
  <card-template :card-title="cardTitle" :base-color="baseColor" :icon-name="iconName" :what="what" :period="period" :id="id">
    <q-card-main class="card-content">
      <div v-if="mama" >
      <q-list class="q-pt-sm">
        <q-item class="justify-around">
          <q-knob v-model="results.cpu.idle" :min="min" :max="max" size="4rem" color="primary" readonly>{{ results.cpu.idle }}%</q-knob>
          <q-knob v-model="results.memory.used_perc" :min="min" :max="max" size="4rem" color="amber" readonly>{{ results.memory.used_perc}}%</q-knob>
          <q-knob v-model="results.filesystems.fsinfo[0].use" :min="min" :max="max" size="4rem" color="green" readonly>{{ results.filesystems.fsinfo[0].use}}%</q-knob>
          <q-knob v-model="results.memory.used_perc" :min="min" :max="max" size="4rem" color="primary" readonly>{{ results.memory.used_perc}}%</q-knob>
        </q-item>
        <q-item class="justify-around">
          <p class="caption">CPU</p>
          <p class="caption">Memory</p>
          <p class="caption">Disk</p>
          <p class="caption">Network</p>
        </q-item>
      </q-list>
      <q-list dense link v-for="(values, key) in pre_check()" v-bind:key="key">
        <q-item>
          <q-item-main>
            <q-list-header large> {{key}}
            </q-list-header>
            <q-item v-if="key !== 'filesystems'" dense v-for="(value, key1) in values" v-bind:key="key1">
              <q-item-main>
                {{key1}}
              </q-item-main>
              <q-item-side right>
                {{value}}
              </q-item-side>
            </q-item>
            <q-list class="q-mt-xs" v-else separator dense v-for="(value1, key2) in values.fsinfo" v-bind:key="key2">
              <q-collapsible dense icon="explore" :label="'['+value1.mount+']' + ' ' + value1.use + '% used'" closed>
                <q-list-header text-color="red"> mount at: {{value1.mount}}
                </q-list-header>
                <q-item dense v-for="(value2, key3) in value1" v-bind:key="key3">
                  <q-item-main>
                    {{key3}}
                  </q-item-main>
                  <q-item-side right>
                    {{value2}}
                  </q-item-side>
                </q-item>
              </q-collapsible>
            </q-list>
          </q-item-main>
        </q-item>
      </q-list>
      </div>
      <div v-else>Loading...
      </div>
    </q-card-main>
  </card-template>
</template>

<script>
import cardTemplate from '../components/cardTemplate.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'cardTopStat',
  data () {
    return {
      options: {
        separator: '.'
      },
      tempkey: '',
      picFlag: true,
      vala: 11,
      min: 0,
      max: 100,
      mama: false
    }
  },
  props: [
    'what',
    'baseColor',
    'iconName',
    'cardTitle',
    'period',
    'scroll_height',
    'id',
    'toPic'
  ],
  components: {
    cardTemplate
  },
  created () {
    var that = this
    // that.$store.dispatch('serverStat/refreshSystemInfo', this.what)
    if (this.period > 0) {
      setInterval(() => {
        that.$store.dispatch('serverStat/refreshSystemInfo', that.what, { root: true })
        this.mama = true
      }, this.period)
    }
    /*
    if (this.period > 0) {
      setInterval(() => {
        this.$axios.get(this.what).then(function (response) {
          that.results = response.data
          if (that.toPic === 'noPic') {
            that.picFlag = false
            that.vala = 0
          } else {
            that.picFlag = true
            that.vala = that.results.cpu[that.toPic] * 1
          }
        })
      }, this.period)
    }
    */
  },
  computed: {
    styles: function () {
      // var height = 200
      return {
        height: this.scroll_height + 'px'
      }
    },
    formatBytes (bytes) {
      if (bytes < 1024) return bytes + ' Bytes'
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
      else return (bytes / 1073741824).toFixed(1) + ' GB'
    },
    ...mapGetters({
      results: 'serverStat/getSystemInfo'
    })
  },
  watch: {},
  methods: {
    pre_check () {
      // this.results = this.$store.getters['serverStat/getSystemInfo']
      var xx
      for (xx in this.results) {
        if (typeof this.results[xx] !== 'object') {
          delete this.results[xx]
        }
      }
      return this.results
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.results = this.$store.getters['serverStat/getSystemInfo']
      var xx = this.$el.clientHeight
      // console.log(xx)
      this.$emit('update-height', Math.ceil(xx / 7))
    })
  }
}
</script>

<style>

</style>
