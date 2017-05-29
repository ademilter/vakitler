import _ from 'lodash'
import moment from 'moment'

export default {
  setIl (state, data) {
    state.il = data
  },
  setIlce (state, data) {
    state.ilce = data
  },
  setZaman (state, data) {
    state.zaman = {
      gun: data.gun,
      ay: data.ay,
      yil: data.yil
    }
  },
  setVakit (state) {
    const end = moment(new Date())
    let fasd = []
    _.forEach(state.vakitler, (val, key) => {
      let asd = val.split(':')
      let now = new Date()
      let period = moment([now.getFullYear(), now.getMonth(), now.getDate(), asd[0], asd[1]])
      if (end.diff(period, 'minutes') > 0) {
        console.log(key, end.diff(period, 'minutes'))
        fasd.push(key)
      }
    })
    state.vakit = _.last(fasd)
  },
  setVakitler (state, data) {
    state.vakitler = data
  }
}
