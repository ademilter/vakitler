<template lang="pug">
  .Settings
    .row
      select(v-show="AllCountries.length", v-model="countryId")
        option(value="-1", selected) Ülke seçin
        option(v-for="Country in AllCountries", :value="Country.UlkeID", :key="Country.UlkeID") {{ Country.UlkeAdi }}
    .row
      select(:disabled="!AllStates.length", v-model="stateId")
        option(value="-1", selected) Şehir seçin
        option(v-for="State in AllStates", :value="State.SehirID", :key="State.SehirID") {{ State.SehirAdi }}
    .row
      select(:disabled="!AllTowns.length", v-model="townId")
        option(value="-1", selected) İlçe seçin
        option(v-for="Town in AllTowns", :value="Town.IlceID", :key="Town.IlceID") {{ Town.IlceAdi }}
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  import Router from '@/router'

  export default {
    name: 'Choose',
    data () {
      return {
        countryId: -1,
        stateId: -1,
        townId: -1
      }
    },
    computed: {
      ...mapGetters([
        'AllCountries',
        'AllStates',
        'AllTowns'
      ])
    },
    watch: {
      countryId () {
        this.changeCountry()
      },
      stateId () {
        this.changeState()
      },
      townId () {
        this.changeTown()
      }
    },
    created () {
      this.$store.dispatch('GET_COUNTRY')
    },
    methods: {
      changeCountry () {
        localStorage.setItem('countryId', this.countryId)
        this.$store.dispatch('GET_STATE')
      },
      changeState () {
        localStorage.setItem('stateId', this.stateId)
        this.$store.dispatch('GET_TOWN')
      },
      changeTown () {
        localStorage.setItem('townId', this.townId)
        let town = _.find(this.AllTowns, ['IlceID', this.townId])
        localStorage.setItem('townName', town.IlceAdi)
        Router.push({ name: 'Home' })
      }
    }
  }
</script>

<style lang="scss">

  .row {
    padding: 30px;

    select {
      display: block;
      width: 100%;
      font-size: 1em;
      height: 50px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #ddd;
    }
  }

</style>
