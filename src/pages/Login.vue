<template>
<q-page padding>
  <!-- content -->
  <div class="col wrap " align="center">
    <div class="col-12 " style="min-width:340px; max-width: 40%" align="left">
      <q-card>
        <q-card-title>로그인 하세요</q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-field icon="person_outline" label="Login" helper="" :error="error" error-label="아이디와 패스워드를 확인 하세요">
            <form v-on:submit.prevent="login">
              <q-input v-model="data.body.name" type="text" clearable float-label="User ID" color="black" />
              <q-input v-model="data.body.password" type="password" clearable no-pass-toggle float-label="Password" />
              <!-- your content           <q-checkbox v-model="data.rememberMe" label="Remeber me" style="margin-top:10px;"/>-->
              <q-card-separator style="margin-top:10px;" />
              <q-btn type="submit" color="primary full-width" style="width:20px;">Login </q-btn>
            </form>
          </q-field>
        </q-card-main>
      </q-card>
    </div>
  </div>
</q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      data: {
        body: {
          name: null,
          password: null
        },
        rememberMe: false
      },
      error: false,
      erro_texto: ''
    }
  },
  mounted () {
    if (this.$auth.redirect()) {
      // console.log('Redirect from: ' + this.$auth.redirect().from.name)
      // Toast.create('로그인인 필요한 기능입니다 : ' + this.$auth.redirect().from.name)
    }
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
    showToast (msg) {
      // Toast.create(msg)
    },
    login () {
      var redirect = this.$auth.redirect()
      if (this.$auth.check()) {
        this.$q.notify({
          type: 'warning',
          message: 'already Logged In'
        })
      } else {
        this.$auth.login({
          headers: {
            'Content-Type': 'application/json'
          },
          data: this.data.body,
          rememberMe: this.data.rememberMe,
          redirect: {name: redirect ? redirect.from.name : 'Home'},
          success (res) {
            this.$q.notify({
              type: 'positive',
              message: 'Login Success'
            })
          },
          error (err) {
            if (err.response) {
              this.error = true
            } else {
            // Something happened in setting up the request that triggered an Error
              // console.log('Error', err.message)
            }
            this.$q.notify({
              type: 'negative',
              message: 'Login Failed'
            })
            this.$auth.logout({
              redirect: '/login',
              makeRequest: false
            // params: {},
            // success: function () {},
            // error: function () {},
            // etc...
            })
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
