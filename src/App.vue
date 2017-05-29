<template lang="pug">
  .App
    router-view
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    border: 0;

    &, &:before, &:after {
      box-sizing: border-box;
    }
  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-weight: 200;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .App {
    height: 100%;
  }
</style>
