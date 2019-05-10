<template>
  <div class="page-settings">
    <select :disabled="!countries.length" v-model="userCountry">
      <option value="-1">Select</option>
      <option
        v-for="country in countries"
        :key="country.UlkeID"
        :value="country.UlkeID"
        >{{ country.UlkeAdiEn }}
      </option>
    </select>
    <select :disabled="!cities.length" v-model="userCity">
      <option value="-1">Select</option>
      <option v-for="city in cities" :key="city.SehirID" :value="city.SehirID">
        {{ city.SehirAdiEn }}
      </option>
    </select>
    <select :disabled="!towns.length" v-model="userTown">
      <option value="-1">Select</option>
      <option v-for="town in towns" :key="town.IlceID" :value="town.IlceID">
        {{ town.IlceAdiEn }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Settings',
  created() {
    if (!this.countries.length) {
      this.fetchCountries()
    }
  },
  watch: {
    countryId() {
      this.fetchCities()
    },
    cityId() {
      this.fetchTowns()
    },
    townId() {
      this.getTimes()
    }
  },
  computed: {
    ...mapState([
      'countries',
      'cities',
      'towns',
      'countryId',
      'cityId',
      'townId'
    ]),
    userCountry: {
      get() {
        return this.countryId
      },
      set(id) {
        this.SAVE_COUNTRY_ID(id)
      }
    },
    userCity: {
      get() {
        return this.cityId
      },
      set(id) {
        this.SAVE_CITY_ID(id)
      }
    },
    userTown: {
      get() {
        return this.townId
      },
      set(id) {
        this.SAVE_TOWN_ID(id)
      }
    }
  },
  methods: {
    ...mapActions(['fetchCountries', 'fetchCities', 'fetchTowns', 'getTimes']),
    ...mapMutations(['SAVE_COUNTRY_ID', 'SAVE_CITY_ID', 'SAVE_TOWN_ID'])
  }
}
</script>
