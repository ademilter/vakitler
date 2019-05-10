import moment from 'moment/moment'

export default class Day {
  constructor(data) {
    this.MiladiTarihUzunIso8601 = data.MiladiTarihUzunIso8601
    //
    this.Imsak = this.convertToDate(data.Imsak)
    this.Gunes = this.convertToDate(data.Gunes)
    this.Ogle = this.convertToDate(data.Ogle)
    this.Ikindi = this.convertToDate(data.Ikindi)
    this.Aksam = this.convertToDate(data.Aksam)
    this.Yatsi = this.convertToDate(data.Yatsi)
  }

  convertToDate(hours) {
    const [hour, minutes] = hours.split(':')
    return moment(this.MiladiTarihUzunIso8601)
      .hour(hour)
      .minutes(minutes)
      .seconds(0)
      .millisecond(0)
  }
}
