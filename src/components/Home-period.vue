<template lang="pug">
  .Period(:class="[Key, order]")
    .content
      .name {{ $t('globals.' + Key) }}
      .time {{ Vakit }}
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Period',
    props: ['Key', 'Vakit'],
    computed: {
      ...mapGetters([
        'vakit',
        'vakitler'
      ]),
      order () {
        const inci = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
        const vakitler = _.keys(this.vakitler)
        const thisIndex = _.indexOf(vakitler, this.vakit)
        const currentIndex = _.indexOf(vakitler, this.Key)
        return inci[Math.abs(thisIndex - currentIndex)]
      }
    }
  }
</script>

<style lang="scss">

  .Period {
    padding-left: 20px;
    padding-right: 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    color: white;
    background-color: #eee;

    .name {
      opacity: .6;
    }

    .time {
      font-weight: 500;
    }

    &.first {
      flex-grow: 32;
      font-size: 24px;
      background-color: #6F6BAE;
    }

    &.second {
      flex-grow: 16;
      background-color: #5A589C;
    }

    &.third {
      flex-grow: 8;
      background-color: #4D4B8C;
    }

    &.fourth {
      flex-grow: 4;
      background-color: #403E7B;
    }

    &.fifth {
      flex-grow: 2;
      background-color: #34326C;
    }

    &.sixth {
      flex-grow: 1;
      background-color: #2E2C64;
    }

  }

</style>
