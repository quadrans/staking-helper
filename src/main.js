import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
//import 'buefy/dist/buefy.css'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueScrollTo)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
