import { createStore } from 'vuex'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state () {
    return {
      localhost: 'http://127.0.0.1:8000'
    }
  },
  getters: {
    domain: state => state.localhost + '/'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
