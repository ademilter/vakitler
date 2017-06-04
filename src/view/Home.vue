<template lang="pug">
  .Home
    .Info
      router-link.Info-link(:to="{ name: 'Settings' }") {{ townName }}
    .Times(:class="currentPeriod")
      rowRamadan(v-if="showRamadan")
      Period(v-for="(Time, Name) in Periods", :Name="Name", :Time="Time", :key="Name")
</template>

<script>
  import { mapGetters } from 'vuex'
  import Period from '@/components/Home-period.vue'
  import rowRamadan from '@/components/Home-row-ramadan.vue'
  import _ from 'lodash'
  import Router from '@/router'

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
      },
      townName () {
        return localStorage.getItem('townName')
      }
    },
    created () {
      if (!localStorage.getItem('townId')) {
        Router.push({ name: 'Settings' })
      } else {
        this.$store.dispatch('GET_PERIOD')
      }
    }
  }
</script>

<style lang="scss">
  .Home {
    position: relative;
    height: 100%;
  }

  $Info-height: 28px;

  .Info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $Info-height;
    color: white;
    background-color: #000;

    &-link {
      font-size: .9em;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .Times {
    position: absolute;
    left: 0;
    right: 0;
    top: $Info-height;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
</style>
