import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
import messages from './i18n-lang'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.lang,
  messages
})

export default i18n
