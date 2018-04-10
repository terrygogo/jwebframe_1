
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

export default ({ Vue, router, app }) => {
  Vue.prototype.$axios = axios
  Vue.router = router
  Vue.use(VueAxios, axios)
  Vue.prototype.$auth = VueAuth
  Vue.axios.defaults.baseURL = 'http:/'
  Vue.use(VueAuth, {
    auth: {
      request: function (req, token) {
        this.options.http._setHeaders.call(this, req, {
          Authorization: 'JWT ' + token
        })
      },
      response: function (res) {
        // Get Token from response body
        return res.data.token //
      }
    },
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    // router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    // loginData: { url: 'http://192.168.1.15:3000/api/login', fetchUser: false },
    loginData: {
      url: '/api/login',
      fetchUser: false
    },
    authRedirect: {
      path: '/login'
    },
    refreshData: {
      enabled: false
    },
    fetchData: {url: 'api/user', method: 'GET', enabled: true}
  })
}
