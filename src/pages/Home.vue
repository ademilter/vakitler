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
        // times = parseInt(times[0]) === 0 ? _.drop(times) : times
        let second = `${parseInt(_.last(times))}`
        if (times.length === 3) return `${times[0]}:${times[1]}:${second}`
        else if (times.length === 2) return `${times[0]}:${second}`
        else if (times.length === 1) return second
      }
    },
    mounted () {
      this.$store.dispatch('getData').then(() => {
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
