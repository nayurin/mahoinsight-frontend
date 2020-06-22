import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import workbox from "./workers/register"

Vue.config.productionTip = false
Vue.prototype.$workbox = workbox
Vue.prototype.$setLSItem = function (key, value) {
  const event = document.createEvent('StorageEvent')
  const set = function () {
    window.localStorage.setItem(key, value)
    event.initStorageEvent('setItemEvent', false, false, key, null, value, null, null)
    window.dispatchEvent(event)
  }
  return set()
}
Vue.prototype.$removeLSItem = function (key) {
  const event = document.createEvent('StorageEvent')
  const remove = function () {
    window.localStorage.removeItem(key)
    event.initStorageEvent('setItemEvent', false, false, null, null, null, null, null)
    window.dispatchEvent(event)
  }
  return remove()
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
