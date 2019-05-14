<template>
  <div
    class="time"
    :class="[time, { active: isActiveTime }, { next: isNextTime }]"
  >
    <div>
      <div class="time-body">
        <h4 class="time-body-title">
          {{ $t(`times.${time}`) }}
        </h4>
        <h3 class="time-body-value">
          {{ datetime.format('HH:mm') }}
        </h3>
      </div>

      <Timer v-if="isActiveTime" :timer="timer" />
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
    nextTime: String
  },
  computed: {
    isActiveTime() {
      return this.time === this.currentTime
    },
    isNextTime() {
      return this.time === this.nextTime
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

  &.active &-body,
  &.next &-body {
    font-size: 1.2em;
  }

  &-body {
    &-title {
      font-weight: normal;
    }
    &-value {
      margin-top: 6px;
      font-size: 1.3em;
    }
  }
}
</style>
