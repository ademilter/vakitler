<template lang="pug">
  .Settings
    .row
      select(:disabled="!allCountries.length", v-model="countryId")
        option(value="-1", selected) {{ $t('ulke-sec') }}
        option(v-for="country in allCountries", :value="country.UlkeID", :key="country.UlkeID") {{ country.UlkeAdi }}
    .row
      select(:disabled="!allStates.length", v-model="stateId")
        option(value="-1", selected) {{ $t('sehir-sec') }}
        option(v-for="state in allStates", :value="state.SehirID", :key="state.SehirID") {{ state.SehirAdi }}
    .row
      select(:disabled="!allTowns.length", v-model="townId")
        option(value="-1", selected) {{ $t('ilce-sec') }}
        option(v-for="town in allTowns", :value="town.IlceID", :key="town.IlceID") {{ town.IlceAdi }}
</template>

<script>
  import _ from 'lodash'
  import Router from '@/router'
  import ODisk from 'o.disk'

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
      allCountries () {
        return this.$store.state.allCountries
      },
      allStates () {
        return this.$store.state.allStates
      },
      allTowns () {
        return this.$store.state.allTowns
      }
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
      let props = ['countryId', 'stateId']
      props.some(function (i) {
        if (ODisk[i]) {
          this[i] = ODisk[i]
          this.$store.dispatch('GET_' + i.match(/(.+)Id/)[1].toUpperCase())
          return false
        }
        return true
      }, this)
    },
    methods: {
      changeCountry () {
        ODisk.countryId = this.countryId
        this.$store.dispatch('GET_STATE')
      },
      changeState () {
        ODisk.stateId = this.stateId
        this.$store.dispatch('GET_TOWN')
      },
      changeTown () {
        ODisk.townId = this.townId
        let town = _.find(this.allTowns, ['IlceID', this.townId])
        ODisk.townName = town.IlceAdi
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
