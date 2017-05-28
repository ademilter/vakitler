import axios from 'axios'

export default {
  getTimes (context) {
    axios.get('http://www.namazvaktim.net/xml/gunluk/istanbul/istanbul.json').then((res) => {
      context.commit('setIl', res.data.namazvakitleri.il)
      context.commit('setIlce', res.data.namazvakitleri.ilce)
      context.commit('setZaman', res.data.namazvakitleri.zaman)
      context.commit('setVakitler', res.data.namazvakitleri.zaman.vakitler)
    })
  }
}
