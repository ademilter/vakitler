import moment from 'moment'
import Day from '../model/day'
import { secondSplit } from '../utils/secondSplit'

export default {
  userTown: state => {
    return state.towns.find(o => o.IlceID === state.townId)
  },
  userCity: state => {
    return state.cities.find(o => o.SehirID === state.cityId)
  },
  today: state => {
    const day = state.times.find(o =>
      moment(o.MiladiTarihUzunIso8601).isSame(moment(), 'day')
    )
    return day ? new Day(day) : null
  },
  tomorrow: state => {
    const day = state.times.find(o =>
      moment(o.MiladiTarihUzunIso8601).isSame(moment().add(1, 'days'), 'day')
    )
    return day ? new Day(day) : null
  },
  currentTime: (state, getters) => {
    if (
      moment(state.now).isBetween(
        getters.today.Imsak,
        getters.today.Gunes,
        null,
        '[)'
      )
    ) {
      return 'Imsak'
    } else if (
      moment(state.now).isBetween(
        getters.today.Gunes,
        getters.today.Ogle,
        null,
        '[)'
      )
    ) {
      return 'Gunes'
    } else if (
      moment(state.now).isBetween(
        getters.today.Ogle,
        getters.today.Ikindi,
        null,
        '[)'
      )
    ) {
      return 'Ogle'
    } else if (
      moment(state.now).isBetween(
        getters.today.Ikindi,
        getters.today.Aksam,
        null,
        '[)'
      )
    ) {
      return 'Ikindi'
    } else if (
      moment(state.now).isBetween(
        getters.today.Aksam,
        getters.today.Yatsi,
        null,
        '[)'
      )
    ) {
      return 'Aksam'
    } else if (
      moment(state.now).isBetween(
        getters.today.Yatsi,
        getters.tomorrow.Imsak,
        null,
        '[)'
      )
    ) {
      return 'Yatsi'
    } else return null
  },
  nextTime: (state, getters) => {
    switch (getters.currentTime) {
      case 'Imsak':
        return 'Gunes'
      case 'Gunes':
        return 'Ogle'
      case 'Ogle':
        return 'Ikindi'
      case 'Ikindi':
        return 'Aksam'
      case 'Aksam':
        return 'Yatsi'
      case 'Yatsi':
        return 'TomorrowImsak'
      default:
        return null
    }
  },
  periodTimer: (state, getters) => {
    let second
    if (getters.nextTime === 'TomorrowImsak') {
      second = getters.tomorrow.Imsak.diff(state.now, 'second')
    } else {
      second = getters.today[getters.nextTime].diff(state.now, 'second')
    }
    return secondSplit(second).join(':')
  },
  isRamadan: state => {
    return moment(state.now).isBetween(
      state.ramadan.start,
      state.ramadan.end,
      null,
      '[]'
    )
  },
  ramadanTimer: (state, getters) => {
    const second = getters.today.Aksam.diff(state.now, 'second')
    return secondSplit(second).join(':')
  }
}
