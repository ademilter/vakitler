<template lang="pug">
  .rowRamadan
    .text {{ $t('iftar') }}
    .count
      span.dash –
      span.bold {{ ramadanCounter[0] }}
      span :
      span.bold {{ ramadanCounter[1] }}
      span :
      span.bold {{ ramadanCounter[2] }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'rowRamadan',
    computed: {
      ...mapGetters([
        'ramadanCounter'
      ])
    }
  }
</script>

<style lang="scss">
  .rowRamadan {
    order: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    background-color: #fff;
    text-align: center;

    .text {
      margin-right: 10px;
    }

    .count {
      display: flex;
      align-items: center;

      span {
        &.dash {
          margin-right: 3px;
          margin-top: -3px;
        }
      }
    }

  }
</style>
