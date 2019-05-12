<template>
  <div class="timer">{{ timer }}</div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    timer: String
  }
}
</script>

<style>
.timer {
  position: absolute;
  right: 30px;
  top: 100%;
  font-size: 1.2em;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  background-color: white;
  font-weight: bold;
  border-radius: var(--radius);
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  font-feature-settings: 'tnum' 1, 'case' 1;
}
</style>
