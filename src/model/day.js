import moment from 'moment/moment'

export default class Day {
  constructor(data) {
    this.MiladiTarihKisa = data.MiladiTarihKisa
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
    return moment(this.MiladiTarihKisa, 'DD.MM.YYYY')
      .hour(hour)
      .minutes(minutes)
      .seconds(0)
      .millisecond(0)
  }
}
