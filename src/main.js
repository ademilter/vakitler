import './core/plugins'
import './core/prototype'

import Vue from 'vue'
import router from './core/router'
import store from './store'
import wait from './utils/wait'

import App from './views/App.vue'

import './styles/app.css'

const init = async () => {
  // TODO: data yüklenmezse?
  if (!store.state.countries.length) {
    await store.dispatch('init')
  }

  setInterval(() => {
    store.commit('TIME_UPDATE')
  }, 1000)

  new Vue({
    router,
    store,
    wait: wait.instance,
    render: h => h(App)
  }).$mount('#app')
}

init()
