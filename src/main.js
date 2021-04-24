import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import workbox from "./workers/register"
import storage from "./util/storage"

Vue.config.productionTip = false
Vue.prototype.$workbox = workbox
Vue.prototype.$setLSItem = storage.setItem
Vue.prototype.$removeLSItem = storage.removeItem
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
