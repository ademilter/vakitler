<template lang="pug">
  .rowRamadan(v-show="status")
    .text {{ $t('iftar') }}
    .count
      span.dash –
      span.bold {{ splitFatoorCounter[0] }}
      span :
      span.bold {{ splitFatoorCounter[1] }}
      span :
      span.bold {{ splitFatoorCounter[2] }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'rowRamadan',
    computed: {
      ...mapGetters([
        'splitFatoorCounter'
      ]),
      status () {
        return this.$store.state.ramadan.status
      }
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

  .t-enterHeight-enter-active, .t-enterHeight-leave-active {
    transition: .2s;
    overflow: hidden;
    transition-delay: 1s;
  }

  .t-enterHeight-enter, .t-enterHeight-leave-to {
    height: 0;
  }
</style>
