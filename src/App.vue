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
    font-family: 'Avenir Next Condensed', 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    font-weight: 400;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6, b, strong, .bold {
    font-weight: 600;
  }

  .App {
    height: 100%;
  }
</style>
