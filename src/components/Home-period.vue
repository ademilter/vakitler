<template lang="pug">
  .Period(:class="[Key, Order]")
    .counter
      div vaktin çıkmasına
      h4 {{ showCounter }}
    .content
      .name {{ $t('periods.' + Key) }}
      .time {{ Time }}
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Period',
    props: ['Key', 'Time', 'showCounter'],
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod'
      ]),
      Order () {
        const ORDER_CLASS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
        const PERIODS = _.keys(this.Periods)
        const CURRENT_INDEX = _.indexOf(PERIODS, this.currentPeriod)
        const THIS_INDEX = _.indexOf(PERIODS, this.Key)
        return ORDER_CLASS[Math.abs(THIS_INDEX - CURRENT_INDEX)]
      }
    }
  }
</script>

<style lang="scss">

  .Period {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    color: white;
    background-color: #eee;
    transition: .2s;

    .counter {
      display: none;
      text-align: right;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);

      h4 {
        margin-top: 5px;
      }
    }

    &.first {
      .counter {
        display: block;
      }
    }

    .name {
      opacity: .6;
      font-size: .9em;
    }

    .time {
      margin-top: 5px;
      font-weight: 500;
    }

    $theme: (
      period: 'imsak',
      bg: #cbf0ff,
      color: #0a8c82
    ), (
      period: 'gunes',
      bg: #ffefba,
      color: #af7400
    ), (
      period: 'ogle',
      bg: #ffdc8a,
      color: #7b660f
    ), (
      period: 'ikindi',
      bg: #fdc7b1,
      color: #944000
    ), (
      period: 'aksam',
      bg: #6fa4e0,
      color: #d9edff
    ), (
      period: 'yatsi',
      bg: #574e9e,
      color: #c5d3ff
    );

    $order: (
      name: 'first',
      grow: 20,
      darken: 0,
      fontSize: 2em
    ), (
      name: 'second',
      grow: 12,
      darken: 4,
      fontSize: 1.20em
    ), (
      name: 'third',
      grow: 10,
      darken: 8,
      fontSize: 1.15em
    ), (
      name: 'fourth',
      grow: 8,
      darken: 12,
      fontSize: 1.1em
    ), (
      name: 'fifth',
      grow: 6,
      darken: 16,
      fontSize: 1.05em
    ), (
      name: 'sixth',
      grow: 4,
      darken: 20,
      fontSize: 1em
    );

    @for $i from 1 through length($theme) {
      $a: nth($theme, $i);
      @for $j from 1 through length($order) {
        $b: nth($order, $j);
        .Times.#{map-get($a, period)} & {
          &.#{map-get($b, name)} {
            flex-grow: map-get($b, grow);
            color: map-get($a, color);
            background-color: desaturate(darken(map-get($a, bg), map-get($b, darken)), map-get($b, darken));
            .content {
              font-size: map-get($b, fontSize);
            }
          }
        }
      }
    }

  }

</style>
