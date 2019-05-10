<template>
  <div class="home" v-if="userTown">
    <div class="settings-link">
      <router-link :to="{ name: 'Settings' }">
        {{ userCity.SehirAdiEn }} - {{ userTown.IlceAdiEn }}
      </router-link>
    </div>
    <div class="times" :class="currentTime">
      <Time
        time="Imsak"
        :datetime="today.Imsak"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
      <Time
        time="Gunes"
        :datetime="today.Gunes"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
      <Time
        time="Ogle"
        :datetime="today.Ogle"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
      <Time
        time="Ikindi"
        :datetime="today.Ikindi"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
      <!--      <Ramadan v-if="isRamadan" :timer="ramadanTimer" />-->
      <Time
        time="Aksam"
        :datetime="today.Aksam"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
      <Time
        time="Yatsi"
        :datetime="today.Yatsi"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
    </div>
  </div>
</template>

<script>
// import moment from 'moment/moment'
import Time from '../components/Time'
import Ramadan from '../components/Ramadan'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'home',

  components: {
    Time,
    Ramadan
  },

  computed: {
    ...mapState(['now']),
    ...mapGetters([
      'userCity',
      'userTown',
      'today',
      'currentTime',
      'nextTime',
      'periodTimer',
      'isRamadan',
      'ramadanTimer'
    ])
  },

  created() {
    if (!this.userTown) this.$router.push({ name: 'Settings' })
  }
}
</script>
