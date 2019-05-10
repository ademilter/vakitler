import Vue from 'vue'

import moment from 'moment'

import wait from '../utils/wait'
import http from '../utils/http'

wait.init()
http.init()

Vue.prototype.$moment = moment

Vue.config.productionTip = false
