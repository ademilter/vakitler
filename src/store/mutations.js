import _ from 'lodash'
import moment from 'moment'

export default {

  SET_COUNTRY (state, countries) {
    const TR = _.find(countries, ['UlkeAdi', 'TÜRKİYE'])
    if (TR) countries.unshift(TR)
    state.allCountries = countries
  },

  SET_STATE (state, states) {
    const IST = _.find(states, ['SehirAdi', 'İSTANBUL'])
    if (IST) states.unshift(IST)
    state.allStates = states
  },

  SET_TOWN (state, towns) {
    state.allTowns = towns
  },

  SET_ALL_PERIODS (state, allPeriods, isLocal) {
    state.allPeriods = allPeriods
    // SET LOCAL STORAGE
    if (!isLocal) {
      localStorage.setItem('allPeriods', JSON.stringify(allPeriods))
    }
  },

  SET_TODAY_PERIODS (state) {
    const NOW = new Date()
    // 2 to 02
    let day = NOW.getDate().toString()
    day = _.size(day) === 1 ? `0${day}` : day
    // 2 to 02
    let month = (NOW.getMonth() + 1).toString()
    month = _.size(month) === 1 ? `0${month}` : month

    const TODAY = _.find(state.allPeriods, ['MiladiTarihKisa', `${day}.${month}.${NOW.getFullYear()}`])
    state.periods = _.pick(TODAY, ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'])
  },

  FIND_ACTIVE_PERIOD (state) {
    let _periods = []
    const NOW = new Date()

    _.forEach(state.periods, (periodTime, periodName) => {
      const HOURS_MINUTES = periodTime.split(':')
      const PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), HOURS_MINUTES[0], HOURS_MINUTES[1]])
      if (moment(NOW).diff(PERIOD, 'seconds') > 0) {
        _periods.push(periodName)
      }
    })

    const PERIODS_KEYS = _.keys(state.periods)

    if (_periods.length > 0) {
      state.currentPeriod = _.last(_periods)
    } else {
      state.currentPeriod = _.last(PERIODS_KEYS)
    }

    const CURRENT_INDEX = _.indexOf(PERIODS_KEYS, state.currentPeriod)
    const NEXT_INDEX = CURRENT_INDEX === (PERIODS_KEYS.length - 1) ? 0 : CURRENT_INDEX + 1
    state.nextPeriod = PERIODS_KEYS[NEXT_INDEX]
  },

  COUNTER (state) {
    const NOW = new Date()
    const CURRENT_HOURS_MINUTES = state.periods[state.currentPeriod].split(':')
    const NEXT_HOURS_MINUTES = state.periods[state.nextPeriod].split(':')

    const CURRENT_PERIOD = moment(NOW)
    const NEXT_PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), NEXT_HOURS_MINUTES[0], NEXT_HOURS_MINUTES[1]])

    if (state.currentPeriod === 'Yatsi') {
      if (NOW.getHours() >= parseInt(CURRENT_HOURS_MINUTES[0]) && NOW.getHours() <= 23) {
        NEXT_PERIOD.add(1, 'day')
      }
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // DEBUG
    const DEBUG = false
    if (DEBUG) {
      // CURRENT_PERIOD.add(122, 'm')
      CURRENT_PERIOD.subtract(174, 'm')
      state.counter = Math.abs(CURRENT_PERIOD.diff(NEXT_PERIOD, 'second'))
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } else {
      state.counter = Math.abs(CURRENT_PERIOD.diff(NEXT_PERIOD, 'second'))
    }
  },

  TOTAL_TIME (state) {
    const NOW = new Date()
    const CURRENT_HOURS_MINUTES = state.periods[state.currentPeriod].split(':')
    const NEXT_HOURS_MINUTES = state.periods[state.nextPeriod].split(':')

    const CURRENT_PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), CURRENT_HOURS_MINUTES[0], CURRENT_HOURS_MINUTES[1]])
    const NEXT_PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), NEXT_HOURS_MINUTES[0], NEXT_HOURS_MINUTES[1]])

    if (state.currentPeriod === 'Yatsi') {
      if (NOW.getHours() >= parseInt(CURRENT_HOURS_MINUTES[0]) && NOW.getHours() <= 23) {
        NEXT_PERIOD.add(1, 'day')
      } else {
        CURRENT_PERIOD.subtract(1, 'day')
      }
    }

    state.periodTotalTime = Math.abs(CURRENT_PERIOD.diff(NEXT_PERIOD, 'second'))
  },

  SET_IS_RAMADAN (state, ramadanStatus) {
    state.ramadan.status = ramadanStatus
  },

  FATOOR_COUNTER (state) {
    const NOW = new Date()
    const NEXT_HOURS_MINUTES = state.periods['Aksam'].split(':')
    let NEXT_PERIOD = moment([NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), NEXT_HOURS_MINUTES[0], NEXT_HOURS_MINUTES[1]])
    state.ramadan.counter = Math.abs(moment(NOW).diff(NEXT_PERIOD, 'second'))
  }

}
