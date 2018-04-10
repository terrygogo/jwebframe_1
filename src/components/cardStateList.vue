<template>
  <card-template :card-title="cardTitle" :base-color="baseColor" :icon-name="iconName" :what="what" :period="period" :id="id">
    <q-card-main class="card-content">
      <q-list dense link v-for="(values, key) in pre_check()" v-bind:key="key">
        <q-item>
          <q-item-side>
            <q-knob v-model="vala" :min="min" :max="max" size="4rem" color="primary" readonly> {{ vala }}%
            </q-knob>
          </q-item-side>
          <q-item-main>
            <q-list-header> {{key}}
            </q-list-header>
            <q-item dense v-for="(value, key1) in values" v-bind:key="key1">
              <q-item-main>
                {{key1}}
              </q-item-main>
              <q-item-side right>
                {{value}}
              </q-item-side>
            </q-item>
          </q-item-main>
        </q-item>
      </q-list>
    </q-card-main>
  </card-template>
</template>

<script>
import cardTemplate from '../components/cardTemplate.vue'
export default {
  name: 'cardStateList',
  data () {
    return {
      options: {
        separator: '.'
      },
      results: [],
      tempkey: '',
      picFlag: true,
      vala: 11,
      min: 0,
      max: 100
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
    this.$axios.get(this.what).then(function (response) {
      that.results = response.data
    })
    if (this.period > 0) {
      setInterval(() => {
        this.$axios.get(this.what).then(function (response) {
          that.results = response.data
        })
      }, this.period)
    }
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
    }
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
      var xx = this.$el.clientHeight
      // console.log(xx)
      this.$emit('update-height', Math.ceil(xx / 7))
    })
  }
}
</script>

<style>

</style>
