
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {path: 'home', component: () => import('pages/Home'), name: 'Home', meta: { label: '홈' }},
      {path: '', component: () => import('pages/Home'), name: 'Default', meta: { label: '홈' }},
      {path: 'login', component: () => import('pages/Login'), name: 'Login', meta: {auth: false, label: '로그인'}},
      {path: 'dashboard', component: () => import('pages/Dashboard'), name: 'Dashboard', meta: {auth: undefined, label: '대시보드'}},
      {path: 'cservices', component: () => import('pages/Cservices'), name: 'ServiceCorebridges', meta: {auth: true, label: 'CoreBridge 서비스'}},
      {path: 'sservices', component: () => import('pages/Sservices'), name: 'ServiceSystems', meta: {auth: true, label: 'System 서비스'}},
      {path: 'widget_logview', component: () => import('pages/WidgetLogview'), name: 'WidgetLogview', meta: {auth: undefined, label: '로그조회'}},
      {path: 'widget_fileupload', component: () => import('pages/WidgetFileUpload'), name: 'WidgetFileUpload', meta: {auth: true, label: '파일 업로드'}},
      {path: 'widget_filedownload', component: () => import('pages/WidgetFileDownload'), name: 'WidgetFileDownload', meta: {auth: true, label: '파일 다운로드'}},
      {path: 'widget_fileview', component: () => import('pages/WidgetFileView'), name: 'WidgetFileView', meta: {auth: undefined, label: '파일 보기'}},
      {path: 'configs', component: () => import('pages/Configs'), name: 'Configs', meta: {auth: true, label: '연계 정책'}},
      {path: 'settings', component: () => import('pages/Settings'), name: 'Settings', meta: {auth: true, label: '관리도구 설정'}},
      {path: 'logs', component: () => import('pages/Logs'), name: 'Logs', meta: {auth: true, label: '로그 조회 '}},
      {path: 'events', component: () => import('pages/Events'), name: 'Events', meta: {auth: true, label: '이벤트 조회'}}
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
