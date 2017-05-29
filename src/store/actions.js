import axios from 'axios'
import _ from 'lodash'

export default {
  getTimes (context) {
    axios.get('http://www.namazvaktim.net/xml/gunluk/istanbul/istanbul.json').then((res) => {
      context.commit('setIl', res.data.namazvakitleri.il)
      context.commit('setIlce', res.data.namazvakitleri.ilce)
      context.commit('setZaman', res.data.namazvakitleri.zaman)
      const vakitler = _.omit(res.data.namazvakitleri.zaman.vakitler, ['kible'])
      context.commit('setVakitler', vakitler)
      context.commit('setVakit')
    })
  }
}
