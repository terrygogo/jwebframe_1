<template>
  <q-card ref="cardman">
    <q-card-title  class="card-title text-white q-pt-xs q-pb-xs" :class="baseColor">
      <q-icon :name="iconName"></q-icon>
      <small>{{cardTitle}} rla </small>
      <q-btn slot="right" small flat>
        <q-icon name="refresh" />
      </q-btn>
      <q-icon slot="right" name="settings_applications">
        <q-popover ref="popover">
          <q-list link class="no-border">
            <q-item @click="$refs.popover.close()">
              <q-item-main label="자세히보기" />
            </q-item>
            <q-item v-close-overlay @click.native="dashboard_add()"  >
              <q-item-main label="설정"  />
            </q-item>
            <q-item @click="dashboard_del(), $refs.popover.close()">
              <q-item-main label="삭제" />
            </q-item>
          </q-list>
        </q-popover>
      </q-icon>
    </q-card-title>
    <div class="no-drag">
    <slot></slot>
    </div>
  </q-card>
</template>

<script>

export default {
  name: 'cardTemplate',
  props: [
    'what',
    'baseColor',
    'iconName',
    'cardTitle',
    'period',
    'scroll_height',
    'id'
  ],
  created () {},
  computed: {
    formatBytes (bytes) {
      if (bytes < 1024) return bytes + ' Bytes'
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
      else return (bytes / 1073741824).toFixed(1) + ' GB'
    }
  },
  watch: {},
  methods: {
    // toggleFullscreen () {
    //  this.$q.fullscreen.toggle()
    // },
    dashboard_add () {
      this.$q.notify({
        type: 'info',
        message: 'add'
      })
      // this.$store.commit('dashboard_add_entry', 'mandu')
    },
    dashboard_close () {
      // this.$store.commit('dashboard_add_entry', this.id)
    },
    dashboard_del () {
      // this.$store.commit('dashboard_delete_entry', this.id)
    }
  },
  data () {
    return {
      options: {
        separator: '.'
      },
      results: null,
      tempkey: ''
    }
  },
  mounted () {}
}
</script>

<style lang="stylus">
</style>
