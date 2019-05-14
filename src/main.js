import './core/plugins'
import './core/prototype'

import Vue from 'vue'
import router from './core/router'
import store from './store'
import i18n from './core/i18n'
import wait from './utils/wait'
import './core/registerServiceWorker'

import App from './views/App.vue'
import './styles/app.css'

const init = async () => {
  if (!store.state.countries.length) {
    await store.dispatch('init')
  }

  if (!store.getters.tomorrow) {
    await store.dispatch('getTimes')
  }

  // TODO: yarınki data yoksa ve offline ise hata ekranını göster

  store.commit('TIME_UPDATE')
  setInterval(() => {
    store.commit('TIME_UPDATE')
  }, 1000)

  new Vue({
    router,
    store,
    i18n,
    wait: wait.instance,
    render: h => h(App)
  }).$mount('#app')
}

init()
