import moment from 'moment/moment'

export default class Period {
  constructor(today, tomorrow) {
    this.today = today
    this.tomorrow = tomorrow

    setInterval(() => {
      this.update()
    }, 1000)
  }

  update() {
    this.now = moment()
  }

  get counter() {
    const second = this.today[this.nextTime].diff(this.now, 'second')
    let pad = x => {
      return x < 10 ? '0' + x : x
    }
    return [
      pad(Math.floor(second / 3600)),
      pad(Math.floor((second % 3600) / 60)),
      pad(Math.floor(second % 60))
    ].join(':')
  }

  get currentTime() {
    if (
      moment(this.now).isBetween(this.today.Imsak, this.today.Gunes, null, '[)')
    ) {
      return 'Imsak'
    } else if (
      moment(this.now).isBetween(this.today.Gunes, this.today.Ogle, null, '[)')
    ) {
      return 'Gunes'
    } else if (
      moment(this.now).isBetween(this.today.Ogle, this.today.Ikindi, null, '[)')
    ) {
      return 'Ogle'
    } else if (
      moment(this.now).isBetween(
        this.today.Ikindi,
        this.today.Aksam,
        null,
        '[)'
      )
    ) {
      return 'Ikindi'
    } else if (
      moment(this.now).isBetween(this.today.Aksam, this.today.Yatsi, null, '[)')
    ) {
      return 'Aksam'
    } else if (
      moment(this.now).isBetween(
        this.today.Yatsi,
        this.tomorrow.Imsak,
        null,
        '[)'
      )
    ) {
      return 'Yatsi'
    } else return null
  }

  get nextTime() {
    switch (this.currentTime) {
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
      default:
        return null
    }
  }
}
