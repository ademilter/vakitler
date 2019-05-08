<template>
  <div class="time" :class="time">
    <div>
      <div>
        {{ time }}
      </div>
      <div>
        {{ datetime.format('HH:mm') }}
      </div>
      <div v-if="timer && time === currentTime">-{{ timer }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  props: {
    time: String,
    datetime: Object,
    currentTime: String,
    timer: String
  }
}
</script>
