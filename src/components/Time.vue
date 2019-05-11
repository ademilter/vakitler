<template>
  <div class="time" :class="[time, { active: isActiveTime }]">
    <div>
      <div class="time-body">
        <h4 class="time-body-title">
          {{ time }}
        </h4>
        <h3 class="time-body-value">
          {{ datetime.format('HH:mm') }}
        </h3>
      </div>

      <Timer v-if="isActiveTime" :timer="timer" :isKerahat="isKerahat" />
    </div>
  </div>
</template>

<script>
import Timer from './Timer'

export default {
  name: 'Time',
  components: {
    Timer
  },
  props: {
    time: String,
    datetime: Object,
    currentTime: String,
    timer: String,
    isKerahat: Boolean
  },
  computed: {
    isActiveTime() {
      return this.time === this.currentTime
    }
  }
}
</script>

<style>
.time {
  position: relative;
  min-height: 90px;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  transition-delay: 0.1s;

  &.active &-body {
    font-size: 1.4em;
  }

  &-body {
    &-title {
      font-weight: normal;
    }
    &-value {
      margin-top: 5px;
      font-size: 1.3em;
    }
  }
}
</style>
