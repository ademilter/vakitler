import _ from 'lodash'
import moment from 'moment'

export default {

  SET_PERIODS (state, data) {
    state.Periods = _.omit(data, ['kible', 'tarih'])
  },

  FIND_CURRENT_PERIOD (state) {
    let _periods = []
    _.forEach(state.Periods, (time, period) => {
      const HOURS_MINUTES = time.split(':')
      const NOW = new Date()
      const PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), HOURS_MINUTES[0], HOURS_MINUTES[1]])
      if (moment(NOW).diff(PERIOD, 'seconds') > 0) {
        _periods.push(period)
      }
    })
    if (_periods.length > 0) {
      state.currentPeriod = _.last(_periods)
    } else {
      state.currentPeriod = _.last(_.keys(state.Periods))
    }
  },

  FIND_NEXT_PERIOD (state) {
    const KEYS = _.keys(state.Periods)
    const CURRENT_INDEX = _.indexOf(KEYS, state.currentPeriod)
    const NEXT_INDEX = CURRENT_INDEX === (KEYS.length - 1) ? 0 : CURRENT_INDEX + 1
    state.nextPeriod = KEYS[NEXT_INDEX]
  },

  COUNTER (state) {
    const NOW = new Date()
    const HOURS_MINUTES = state.Periods[state.nextPeriod].split(':')
    let NEXT_PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), HOURS_MINUTES[0], HOURS_MINUTES[1]])
    if (state.currentPeriod === 'yatsi') NEXT_PERIOD.add(1, 'day')
    state.Counter = Math.abs(moment(NOW).diff(NEXT_PERIOD, 'second'))
  }

}
