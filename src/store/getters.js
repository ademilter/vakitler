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
      moment(o.MiladiTarihKisa, 'DD.MM.YYYY').isSame(moment(state.now), 'day')
    )
    return day ? new Day(day) : null
  },
  tomorrow: state => {
    const day = state.times.find(o =>
      moment(o.MiladiTarihKisa, 'DD.MM.YYYY').isSame(
        moment(state.now).add(1, 'days'),
        'day'
      )
    )
    return day ? new Day(day) : null
  },
  isBeforeImsak: (state, getters) => {
    return moment(state.now).isBetween(
      moment(state.now).startOf('date'),
      getters.today.Imsak,
      null,
      '[)'
    )
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
      ) ||
      getters.isBeforeImsak
    ) {
      return 'Yatsi'
    }
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
        return 'Imsak'
    }
  },
  timer: (state, getters) => {
    let second
    if (getters.nextTime === 'Imsak') {
      second = getters.isBeforeImsak
        ? getters.today.Imsak.diff(state.now, 'second')
        : getters.tomorrow.Imsak.diff(state.now, 'second')
    } else {
      second = getters.today[getters.nextTime].diff(state.now, 'second')
    }
    return secondSplit(second).join(':')
  }
}
