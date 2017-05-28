import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import router from './router'

import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
