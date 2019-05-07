import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vant,{ Toast } from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import setAxios from './setAxios'

setAxios()

Vue.prototype.$http = axios

router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth) {
    // 先获取浏览器里存储的token
    localStorage.getItem('token')
    // 在将浏览器里的token存储到vuex里
    store.commit('setToken',localStorage.getItem('token'))
    if (store.state.token) {
      next()
    } else {
      Toast.fail('登录后再操作')
      next({
        path: '/login',
        query: {
          redireact: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
