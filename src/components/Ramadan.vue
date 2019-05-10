<template>
  <div class="ramadan">iftar vakti {{ timer }}</div>
</template>

<script>
export default {
  name: 'Ramadan',
  props: {
    timer: String
  }
}
</script>

<style>
.ramadan {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: white;
  background-color: #333;
}
</style>
