export default {
  drawerMenu: [
    {
      type: 'just_label',
      deco: 'green',
      name: '모니터'
    },
    {
      type: 'self_worker',
      id: 'dashboard',
      target: '/dashboard',
      icon: 'web',
      name: '대시보드'
    },
    {
      type: 'group_leader',
      id: 'services',
      icon: 'directions_run',
      target: '',
      name: '서비스',
      competitions: [
        {
          id: 'service_corebridges',
          target: '/cservices',
          name: 'CoreBridge',
          icon: 'storage'
        },
        {
          id: 'service_systems',
          target: '/sservices',
          name: 'System',
          icon: 'computer'
        }
      ]
    },
    {
      type: 'self_worker',
      id: 'events',
      target: '/events',
      icon: 'report_problem',
      name: '이벤트'
    },
    {
      type: 'self_worker',
      id: 'logs',
      target: '/logs',
      icon: 'event_note',
      name: '로그조회'
    },
    {
      type: 'self_worker',
      id: 'configs',
      target: '/configs',
      icon: 'build',
      name: '정책설정'
    },
    {
      type: 'just_label',
      deco: 'green',
      name: '연구소'
    },
    {
      type: 'group_leader',
      id: 'services',
      icon: 'apps',
      target: '',
      name: '실험실',
      competitions: [
        {
          id: 'widget_logview',
          target: '/widget_logview',
          name: '로그조회',
          icon: 'event_note'
        },
        {
          id: 'widget_fileupload',
          target: '/widget_fileupload',
          name: '파일업로드',
          icon: 'file_upload'
        },
        {
          id: 'widget_filedownload',
          target: '/widget_filedownload',
          name: '파일다운로드',
          icon: 'file_download'
        },
        {
          id: 'widget_fileview',
          target: '/widget_fileview',
          name: '파일 보기',
          icon: 'visibility'
        }
      ]
    },
    {
      type: 'just_label',
      deco: 'green',
      name: '설정'
    },
    {
      type: 'self_worker',
      id: 'setting',
      target: '/settings',
      icon: 'settings',
      name: '설정'
    }
  ],
  dashboardLayout: [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 24,
      i: '1',
      ref: 'babo',
      api: '/api/systemtopstat',
      comp_type: 'card-top-stat',
      title: 'TOP system info',
      refresh_period: 10000,
      scroll_height: 160,
      toPic: 'noPic'
    },
    {
      x: 4,
      y: 0,
      w: 8,
      h: 6,
      i: '2',
      api: '/api/processess',
      comp_type: 'card-state-table',
      title: 'process info',
      refresh_period: -1,
      scroll_height: 160,
      toPic: 'noPic'
    },
    {
      x: 4,
      y: 6,
      w: 8,
      h: 6,
      i: '3',
      api: '/api/connectstat',
      comp_type: 'card-state-table',
      title: 'connections',
      refresh_period: -1,
      scroll_height: 160,
      toPic: 'noPic'
    },
    {
      x: 4,
      y: 12,
      w: 8,
      h: 6,
      i: '4',
      api: '/api/services',
      comp_type: 'card-state-table',
      title: 'services',
      refresh_period: 5000,
      scroll_height: 160,
      toPic: 'noPic'
    },
    {
      x: 4,
      y: 18,
      w: 8,
      h: 6,
      i: '5',
      api: '/api/networkinterfaces',
      comp_type: 'card-state-table',
      title: 'network interface',
      refresh_period: -1,
      scroll_height: 160,
      toPic: 'noPic'
    }
  ]
}
