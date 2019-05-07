import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/vuex/State.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    setToken (state,token) {
      state.token = token
    }
  },
  actions: {

  }
})
