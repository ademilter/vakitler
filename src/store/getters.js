import moment from 'moment'
import Day from '../model/day'
import Period from '../model/period'

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
  period: (state, getters) => {
    if (!getters.tomorrow) return null
    return new Period(getters.today, getters.tomorrow)
  }
}
