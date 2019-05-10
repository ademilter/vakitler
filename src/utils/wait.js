import VueWait from 'vue-wait'

class Wait {
  init() {
    if (this.instance) return

    this.instance = new VueWait({
      useVuex: true,
      registerComponent: false,
      registerDirective: false
    })
  }
}

export default new Wait()
