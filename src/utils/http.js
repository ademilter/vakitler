import axios from 'axios'

class Http {
  init() {
    if (this.instance) return

    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: { 'x-parola': process.env.VUE_APP_API_PASS }
    })
  }
}

export default new Http()
