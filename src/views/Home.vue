<template>
  <div class="page-home" v-if="userTown">
    <div class="settings-link">
      <router-link :to="{ name: 'Settings' }">
        {{ userTown.IlceAdiEn }}
      </router-link>
    </div>
    <div class="times" :class="currentTime">
      <Time
        v-for="time in ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi']"
        :key="time"
        :time="time"
        :datetime="today[time]"
        :currentTime="currentTime"
        :timer="periodTimer"
      />
    </div>
  </div>
</template>

<script>
import Time from '../components/Time'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'home',

  components: {
    Time
  },

  computed: {
    ...mapState(['now']),
    ...mapGetters(['userTown', 'today', 'currentTime', 'periodTimer'])
  }
}
</script>

<style>
.settings-link {
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 30px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-home {
  padding-top: 30px;
}

.times {
  height: calc(100vh - 30px);
  background-color: #eee;
  display: grid;
}
</style>
