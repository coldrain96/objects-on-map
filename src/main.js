import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { BootstrapVue } from 'bootstrap-vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueLayers)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')