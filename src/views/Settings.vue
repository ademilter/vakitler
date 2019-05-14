<template>
  <div class="page-settings">
    <ul>
      <li>
        <h2>{{ $t(`settings.data`) }}</h2>
      </li>
      <li>
        <label>{{ $t(`settings.country`) }}</label>
        <select
          :disabled="!countries.length"
          :class="{ disabled: !countries.length }"
          v-model="userCountry"
        >
          <option value="-1">Select</option>
          <option
            v-for="country in countries"
            :key="country.UlkeID"
            :value="country.UlkeID"
          >
            {{ country.UlkeAdiEn }}
          </option>
        </select>
      </li>
      <li>
        <label>{{ $t(`settings.city`) }}</label>
        <select
          :disabled="!cities.length"
          :class="{ disabled: !cities.length }"
          v-model="userCity"
        >
          <option value="-1">Select</option>
          <option
            v-for="city in cities"
            :key="city.SehirID"
            :value="city.SehirID"
          >
            {{ city.SehirAdiEn }}
          </option>
        </select>
      </li>
      <li>
        <label>{{ $t(`settings.town`) }}</label>
        <select
          :disabled="!towns.length"
          :class="{ disabled: !towns.length }"
          v-model="userTown"
        >
          <option value="-1">Select</option>
          <option v-for="town in towns" :key="town.IlceID" :value="town.IlceID">
            {{ town.IlceAdiEn }}
          </option>
        </select>
      </li>
    </ul>
    <ul>
      <li>
        <h2>{{ $t(`settings.settings`) }}</h2>
      </li>
      <li>
        <label>{{ $t(`settings.language`) }}</label>
        <select v-model="changeLang">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="locale"
            :value="locale"
          >
            {{ $t(`locales.${locale}`) }}
          </option>
        </select>
      </li>
    </ul>
    <ul class="bottom">
      <li class="save">
        <router-link
          class="button"
          :class="{ disabled: townId === -1 }"
          :to="{ name: 'Home' }"
        >
          {{ $t(`settings.saveAndBack`) }}
        </router-link>
      </li>
    </ul>
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
  computed: {
    ...mapState([
      'countries',
      'cities',
      'towns',
      'countryId',
      'cityId',
      'townId',
      'lang'
    ]),
    userCountry: {
      get() {
        return this.countryId
      },
      set(id) {
        this.SAVE_COUNTRY_ID(id)
        this.fetchCities()
      }
    },
    userCity: {
      get() {
        return this.cityId
      },
      set(id) {
        this.SAVE_CITY_ID(id)
        this.fetchTowns()
      }
    },
    userTown: {
      get() {
        return this.townId
      },
      set(id) {
        this.SAVE_TOWN_ID(id)
        this.getTimes()
      }
    },
    changeLang: {
      get() {
        return this.lang
      },
      set(locale) {
        this.$i18n.locale = locale
        this.CHANGE_LANG(locale)
      }
    }
  },
  methods: {
    ...mapActions(['fetchCountries', 'fetchCities', 'fetchTowns', 'getTimes']),
    ...mapMutations([
      'SAVE_COUNTRY_ID',
      'SAVE_CITY_ID',
      'SAVE_TOWN_ID',
      'CHANGE_LANG'
    ])
  }
}
</script>

<style>
.page-settings {
  padding: 30px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ddd;

  ul {
    margin-bottom: 30px;
  }

  .bottom {
    margin-top: auto;
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 14px;

    label {
      display: flex;
      margin-bottom: 7px;
    }
  }
  .save {
    margin-top: 20px;
  }
}
</style>
