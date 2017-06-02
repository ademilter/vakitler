<template lang="pug">
  .Times(:class="currentPeriod")
    Period(v-for="(Time, Key) in Periods", :percentCounter="percentCounter", :showCounter="showCounter", :Key="Key", :Time="Time", :key="Key")
</template>

<script>
  import { mapGetters } from 'vuex'
  import Period from '@/components/Home-period.vue'
  // import _ from 'lodash'

  export default {
    name: 'Home',
    components: {
      Period
    },
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod',
        'Counter',
        'secCounter',
        'periodTotalTime'
      ]),
      showCounter () {
        /*
        let times = this.Counter
        times = parseInt(times[0]) === 0 ? _.drop(times) : times // clear h
        times = parseInt(times[0]) === 0 ? _.drop(times) : times // clear min
        let second = `${_.last(times)}`

        if (times.length === 3) return times.join(':')
        else if (times.length === 2) return `${times[0]}:${second}`
        else if (times.length === 1) return second
        */
      },
      percentCounter () {
        let counter = this.secCounter
        let totalTime = this.periodTotalTime
        return counter * 100 / totalTime
      },
      kerahat () {
        // reserve
      }
    },
    mounted () {
      this.$store.dispatch('getData').then(() => {
        this.$store.commit('TOTAL_TIME')
        setInterval(() => {
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
