import Vue from 'vue'
import Vuex from 'vuex'
import cbmClient from './client-settings'
import cbmServer from './server-settings'
import serverStat from './server-stats'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cbmClient,
    cbmServer,
    serverStat
  }
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./client-settings'], () => {
    const newcbmClient = require('./client-settings').default
    store.hotUpdate({ modules: { cbmClient: newcbmClient } })
  })
  module.hot.accept(['./server-settings'], () => {
    const newcbmServer = require('./server-settings').default
    store.hotUpdate({ modules: { cbmServer: newcbmServer } })
  })
  module.hot.accept(['./server-stats'], () => {
    const newServerStat = require('./server-stats').default
    store.hotUpdate({ modules: { serverStat: newServerStat } })
  })
}
export default store
