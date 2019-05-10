<template>
  <div class="timer">– {{ time }}</div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    time: String
  }
}
</script>

<style>
.timer {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  background-color: white;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  font-feature-settings: 'tnum' 1, 'case' 1;

  &.ramadan {
    color: white;
    background-color: #290686;
  }
}
</style>
