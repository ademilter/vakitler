<template lang="pug">
  .Period(:class="[Key, Order]")
    .counter
      .title vaktin çıkmasına
      h3.count {{ showCounter }}
    .content
      .name {{ $t(Key.toLowerCase()) }}
      .time.bold {{ Time }}
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

      .title {

      }
      .count {
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
    }

    $theme: (
      period: 'Imsak',
      bg: #D2F2FF,
      color: #1585A7
    ), (
      period: 'Gunes',
      bg: #FFE1A1,
      color: #A6601E
    ), (
      period: 'Ogle',
      bg: #FFF09C,
      color: #806902
    ), (
      period: 'Ikindi',
      bg: #FFC8B9,
      color: #904714
    ), (
      period: 'Aksam',
      bg: #88BCF7,
      color: #1A4F8A
    ), (
      period: 'Yatsi',
      bg: #332F70,
      color: #BCD4E5
    );

    $order: (
      name: 'first',
      grow: 20,
      darken: 0,
      fontSize: 2.2em
    ), (
      name: 'second',
      grow: 12,
      darken: 4,
      fontSize: 1.3em
    ), (
      name: 'third',
      grow: 10,
      darken: 8,
      fontSize: 1.2em
    ), (
      name: 'fourth',
      grow: 8,
      darken: 12,
      fontSize: 1.1em
    ), (
      name: 'fifth',
      grow: 6,
      darken: 16,
      fontSize: 1em
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
