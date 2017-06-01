<template lang="pug">
  .Times(:class="currentPeriod")
    Period(v-for="(Time, Key) in Periods", :showCounter="showCounter", :Key="Key", :Time="Time", :key="Key")
</template>

<script>
  import { mapGetters } from 'vuex'
  import Period from '@/components/Home-period.vue'
  import _ from 'lodash'

  export default {
    name: 'Home',
    components: {
      Period
    },
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod',
        'Counter'
      ]),
      showCounter () {
        let times = parseInt(this.Counter[0]) === 0 ? _.drop(this.Counter) : this.Counter
        times = parseInt(times[0]) === 0 ? _.drop(times) : times
        // TODO: s, dk, sn gibi kelimeler dil dosyasına eklenecek (nasıl olur bilemedim)
        if (times.length === 1) return `${parseInt(times[0])}sn`
        else if (times.length === 2) return `${parseInt(times[0])}dk`
        else if (times.length === 3) return `${parseInt(times[0])}s ${parseInt(times[1])}dk`
      }
    },
    mounted () {
      this.$store.dispatch('getData').then(() => {
        this._timer = setInterval(() => {
          this.$store.commit('COUNTER')
          if (this.Counter === 0) {
            this.$store.commit('FIND_CURRENT_PERIOD')
            this.$store.commit('FIND_NEXT_PERIOD')
          }
        }, 1000)
      })
    }
  }
</script>

<style lang="scss">
  .Times {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
