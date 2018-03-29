<template>
  <q-page padding>
    <div class="row wrap ">
      <div class="col-12" align="center">
        <img src="~assets/cb_logo_r.png" style="width:35%;  ">
      </div>
      <div class="col-12" align="center">
        <p>
          <br>
          <strong class="uppercase">CoreBridge Web Manager V2</strong>
          <br> Live Development
          <br>
          <br> {{$q.version}}
        </p>
      </div>
      <div class="col-12" align="center">
        <div class="row" style="width:70%; ; padding:20px; margin-top:40px;">
          <div class="col-3 gt-sm">
            <q-btn round icon="web" size="xl" color="blue-5" big @click="$router.push('/dashboard')">
             <q-tooltip>대시보드</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 gt-sm">
            <q-btn round icon="report_problem" size="xl" color="indigo-5" big @click="$router.push('/events')">
            <q-tooltip>이벤트</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 gt-sm">
            <q-btn round icon="event_note" size="xl" color="orange-5" big @click="$router.push('/logs')">
            <q-tooltip>로그조회</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 gt-sm">
            <q-btn round icon="settings" size="xl" color="red-5" big @click="$router.push('/settings')">
            <q-tooltip>설정을 설정 합니다</q-tooltip>
            </q-btn>
          </div>

          <div class="col-3 lt-md">
            <q-btn round icon="show_chart" color="blue-5" @click="$router.push('/dashboard')">
            <q-tooltip>대시보드</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 lt-md">
            <q-btn round icon="report_problem" color="indigo-5" @click="$router.push('/events')">
            <q-tooltip>이벤트</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 lt-md">
            <q-btn round icon="event_note" color="orange-5" @click="$router.push('/logs')">
            <q-tooltip>로그조회</q-tooltip>
            </q-btn>
          </div>
          <div class="col-3 lt-md">
            <q-btn round icon="settings" color="red-5" @click="$router.push('/settings')">
             <q-tooltip>설정을 설정 합니다</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <!-- your content -->
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
