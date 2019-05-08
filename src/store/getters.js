import moment from 'moment'

export default {
  userTown: state => {
    return state.towns.find(o => o.IlceID === state.townId)
  },
  userCity: state => {
    return state.cities.find(o => o.SehirID === state.cityId)
  },
  today: state => {
    return state.times.find(o =>
      moment(o.MiladiTarihUzunIso8601).isSame(moment(), 'day')
    )
  },
  tomorrow: state => {
    return state.times.find(o =>
      moment(o.MiladiTarihUzunIso8601).isSame(moment().add(1, 'days'), 'day')
    )
  },
  times: (state, getters) => {
    const [imsakHour, imsakMinutes] = getters.today.Imsak.split(':')
    const [gunesHour, gunesMinutes] = getters.today.Gunes.split(':')
    const [ogleHour, ogleMinutes] = getters.today.Ogle.split(':')
    const [ikindiHour, ikindiMinutes] = getters.today.Ikindi.split(':')
    const [aksamHour, aksamMinutes] = getters.today.Aksam.split(':')
    const [yatsiHour, yatsiMinutes] = getters.today.Yatsi.split(':')
    const [
      tomorrowImsakHour,
      tomorrowImsakMinutes
    ] = getters.tomorrow.Imsak.split(':')
    return {
      Imsak: moment()
        .hour(imsakHour)
        .minutes(imsakMinutes),
      Gunes: moment()
        .hour(gunesHour)
        .minutes(gunesMinutes),
      Ogle: moment()
        .hour(ogleHour)
        .minutes(ogleMinutes),
      Ikindi: moment()
        .hour(ikindiHour)
        .minutes(ikindiMinutes),
      Aksam: moment()
        .hour(aksamHour)
        .minutes(aksamMinutes),
      Yatsi: moment()
        .hour(yatsiHour)
        .minutes(yatsiMinutes),
      TomorrowImsak: moment()
        .hour(tomorrowImsakHour)
        .minutes(tomorrowImsakMinutes)
        .add(1, 'days')
    }
  },
  currentTime: (state, getters) => {
    const currentTime = moment()
    if (
      moment(currentTime).isBetween(
        getters.times.Imsak,
        getters.times.Gunes,
        null,
        '[)'
      )
    ) {
      return 'Imsak'
    } else if (
      moment(currentTime).isBetween(
        getters.times.Gunes,
        getters.times.Ogle,
        null,
        '[)'
      )
    ) {
      return 'Gunes'
    } else if (
      moment(currentTime).isBetween(
        getters.times.Ogle,
        getters.times.Ikindi,
        null,
        '[)'
      )
    ) {
      return 'Ogle'
    } else if (
      moment(currentTime).isBetween(
        getters.times.Ikindi,
        getters.times.Aksam,
        null,
        '[)'
      )
    ) {
      return 'Ikindi'
    } else if (
      moment(currentTime).isBetween(
        getters.times.Aksam,
        getters.times.Yatsi,
        null,
        '[)'
      )
    ) {
      return 'Aksam'
    } else if (
      moment(currentTime).isBetween(
        getters.times.Yatsi,
        getters.times.TomorrowImsak,
        null,
        '[)'
      )
    ) {
      return 'Yatsi'
    }
  },
  nextTime: (state, getters) => {
    if (getters.currentTime === 'Imsak') return 'Gunes'
    else if (getters.currentTime === 'Gunes') return 'Ogle'
    else if (getters.currentTime === 'Ogle') return 'Ikindi'
    else if (getters.currentTime === 'Ikindi') return 'Aksam'
    else if (getters.currentTime === 'Aksam') return 'Yatsi'
    else if (getters.currentTime === 'Yatsi') return 'TomorrowImsak'
  }
}
