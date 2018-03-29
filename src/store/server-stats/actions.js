/*
export const someAction = (state) => {}
 */
import axios from 'axios'
export const refreshSystemInfo = (context, toda) => {
  // Commits the 'setStoredNumber' mutation with the value of whatever myRemoteService.getRemoteValue() resolves through a promise.
  axios.get(toda).then(function (response) {
    context.commit('setSystemInfo', response.data)
  })
}
