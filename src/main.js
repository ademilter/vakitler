import './core/plugins'
import './core/components'
import './core/prototype'

import Vue from 'vue'
import router from './core/router'
import store from './store'
import wait from './utils/wait'

import App from './views/App.vue'

import './styles/app.css'

const init = async () => {
  const app = new Vue({
    router,
    store,
    wait: wait.instance,
    render: h => h(App)
  })

  app.$mount('#app')
}

init()
