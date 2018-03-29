<template>
  <card-template :card-title="cardTitle" :base-color="baseColor" :icon-name="iconName" :what="what" :period="period" :id="id">
    <q-card-main class="card-content">
      <q-list class="q-pt-sm" >
        <q-item class="justify-around">
            <q-knob v-model="vala" :min="min" :max="max" size="4rem" color="primary" readonly>{{ vala }}%</q-knob>
            <q-knob v-model="vala" :min="min" :max="max" size="4rem" color="primary" readonly>{{ vala }}%</q-knob>
            <q-knob v-model="vala" :min="min" :max="max" size="4rem" color="primary" readonly>{{ vala }}%</q-knob>
            <q-knob v-model="vala" :min="min" :max="max" size="4rem" color="primary" readonly>{{ vala }}%</q-knob>
            <peity :type="'bar'" :options="{ width: 50, height:50 }" :data="pieData"></peity>
        </q-item>
         <q-item class="justify-around">
            <p class="caption">CPU</p>
            <p class="caption">Memory</p>
            <p class="caption">Disk</p>
            <p class="caption self-center">Network</p>
        </q-item>
      </q-list>
    </q-card-main>
  </card-template>
</template>

<script>
import cardTemplate from '../components/cardTemplate.vue'
import Peity from 'vue-peity'
export default {
  name: 'cardSystemState',
  props: [
    'what',
    'baseColor',
    'iconName',
    'cardTitle',
    'period',
    'scroll_height',
    'id'
  ],
  components: {
    cardTemplate,
    Peity
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
    setInterval(() => {
      // https://vuejs.org/guide/list.html#Mutation-Methods
      this.data.push(this.data.shift())
    }, 1000)
  },
  computed: {
    styles: function () {
      // var height = 200
      return {
        height: this.scroll_height + 'px'
      }
    },
    pieData () {
      return this.data.toString()
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
      data: [45, 67, 65, 72, 80, 90, 15, 34, 56, 67],
      options: {
        separator: '.'
      },
      results: null,
      tempkey: '',
      vala: 55,
      min: 0,
      max: 100
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
