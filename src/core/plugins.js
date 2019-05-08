import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueWait from 'vue-wait'

Vue.use(VueWait)
Vue.use(VeeValidate, {
  events: 'input|blur',
  errorBagName: 'veeErrors',
  fieldsBagName: 'veeFields',
  inject: false
})
