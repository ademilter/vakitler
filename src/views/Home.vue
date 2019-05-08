<template>
  <div class="home">
    <div class="settings-link">
      <router-link :to="{ name: 'Settings' }">
        {{ userCity.SehirAdiEn }} - {{ userTown.IlceAdiEn }}
      </router-link>
    </div>
    <div class="times" :class="currentTime">
      <template v-for="(time, key) in times">
        <Time
          v-if="key !== 'TomorrowImsak'"
          :key="key"
          :time="key"
          :datetime="time"
          :currentTime="currentTime"
          :timer="timer"
        />
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Time from '../components/Time'
import { mapGetters } from 'vuex'

export default {
  name: 'home',

  data() {
    return {
      timer: null
    }
  },

  components: {
    Time
  },

  computed: {
    ...mapGetters(['userCity', 'userTown', 'times', 'currentTime', 'nextTime'])
  },

  methods: {
    setTimer() {
      const second = this.times[this.nextTime].diff(moment(), 'second')
      let pad = x => {
        return x < 10 ? '0' + x : x
      }
      this.timer = [
        pad(Math.floor(second / 3600)),
        pad(Math.floor((second % 3600) / 60)),
        pad(Math.floor(second % 60))
      ].join(':')
    }
  },

  created() {
    this.setTimer()
    setInterval(() => {
      this.setTimer()
    }, 1000)
  }
}
</script>
