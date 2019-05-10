<template>
  <div class="home" v-if="userTown">
    <div class="settings-link">
      <router-link :to="{ name: 'Settings' }">
        {{ userCity.SehirAdiEn }} - {{ userTown.IlceAdiEn }}
      </router-link>
    </div>
    <div class="times" :class="period.currentTime">
      <Time
        time="Imsak"
        :datetime="today.Imsak"
        :currentTime="period.currentTime"
        :timer="period.counter"
      />
      <Time
        time="Gunes"
        :datetime="today.Gunes"
        :currentTime="period.currentTime"
        :timer="period.counter"
      />
      <Time
        time="Ogle"
        :datetime="today.Ogle"
        :currentTime="period.currentTime"
        :timer="period.counter"
      />
      <Time
        time="Ikindi"
        :datetime="today.Ikindi"
        :currentTime="period.currentTime"
        :timer="period.counter"
      />
      <Ramadan />
      <Time
        time="Yatsi"
        :datetime="today.Yatsi"
        :currentTime="period.currentTime"
        :timer="period.counter"
      />
    </div>
  </div>
</template>

<script>
import Time from '../components/Time'
import Ramadan from '../components/Ramadan'
import { mapGetters } from 'vuex'

export default {
  name: 'home',

  components: {
    Time,
    Ramadan
  },

  computed: {
    ...mapGetters(['userCity', 'userTown', 'today', 'period'])
  },

  created() {
    if (!this.userTown) this.$router.push({ name: 'Settings' })
  }
}
</script>
