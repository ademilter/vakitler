import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locales/en.yml'
import tr from './locales/tr.yml'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'tr',
  messages: {
    en,
    tr
  }
})
