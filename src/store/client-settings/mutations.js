/*
export const someMutation = (state) => {
}
*/
export const addWidget = (state, card) => {
  var ton = {
    x: 0,
    y: 0,
    w: 2,
    h: 12,
    i: '100',
    ref: 'babo',
    api: '/api/processess',
    comp_type: 'card-state-table',
    title: card,
    refresh_period: -1,
    scroll_height: 80
  }
  state.dashboardLayout.push(ton)
}
export const updateDashboardLayout = (state, data) => {
  state.dashboardLayout = JSON.parse(JSON.stringify(data))
}
