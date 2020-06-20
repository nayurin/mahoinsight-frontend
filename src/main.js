import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import workbox from "./workers/register"

Vue.config.productionTip = false
Vue.prototype.$workbox = workbox

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
