<template lang="pug">
  .Times(:class="currentPeriod")
    rowRamadan(v-if="showRamadan")
    Period(v-for="(Time, Name) in Periods", :Name="Name", :Time="Time", :key="Name")
</template>

<script>
  import { mapGetters } from 'vuex'
  import Period from '@/components/Home-period.vue'
  import rowRamadan from '@/components/Home-row-ramadan.vue'
  import _ from 'lodash'

  export default {
    name: 'Home',
    components: {
      Period,
      rowRamadan
    },
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod',
        'ramadanStatus'
      ]),
      showRamadan () {
        return this.ramadanStatus && !_.includes(['Ikindi', 'Aksam', 'Yatsi'], this.currentPeriod)
      }
    },
    mounted () {
      this.$store.dispatch('getData')
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
