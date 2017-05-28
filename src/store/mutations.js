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
  setVakitler (state, data) {
    state.vakitler = data
  }
}
