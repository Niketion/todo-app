import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  components: { Master },
  template: '<Master/>'
})