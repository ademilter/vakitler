<template lang="pug">
  .Period(:class="[Key, Order]")
    transition(name='t-enterLeft')
      .counter(v-show="percentCounter", :style="{ bottom: percentCounter + '%' }")
        .count
          span.dash –
          span.bold {{ Counter[0] }}
          span :
          span.bold {{ Counter[1] }}
          span :
          span.bold {{ Counter[2] }}
        img(src="../assets/counter-bg.svg")
    .content
      .name {{ $t(Key.toLowerCase()) }}
      .time.bold {{ Time }}
    .bar
    //.bar(v-show="percentCounter", :style="{ height: 100 - percentCounter + '%' }")
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Period',
    props: ['Key', 'Time', 'showCounter', 'percentCounter'],
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod',
        'Counter'
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

    .bar {
      display: none;
      z-index: 2;
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      height: 100%;
      background-color: currentColor;
    }

    &.first .bar {
      display: block;
    }

    .counter {
      display: none;
      position: absolute;
      right: 10px;
      transform: translateY(50%);
      width: 110px;
      //filter: drop-shadow(0 1px 3px rgba(black, .06));

      // aspect-ratio box
      &:before {
        content: "";
        display: block;
        padding-top: percentage(46/163); // svg h/w
      }

      .count {
        font-size: 1.2em;
        z-index: 1;
        position: absolute;
        left: 10px;
        top: 55%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;

        span {
          &.dash {
            margin-right: 3px;
            margin-top: -1px;
          }
        }
      }

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

    }

    &.first .counter {
      display: block;
    }

    .name {
      font-size: .8em;
    }

    .time {
      margin-top: 4px;
      font-size: 1.1em;
    }

    $theme: (
      period: 'Imsak',
      bg: #D2F2FF,
      color: #1281A2
    ), (
      period: 'Gunes',
      bg: #FFEBC1,
      color: #A6601E
    ), (
      period: 'Ogle',
      bg: #FFEDA3,
      color: #804502
    ), (
      period: 'Ikindi',
      bg: #FFD8BA,
      color: #8F361A
    ), (
      period: 'Aksam',
      bg: #8BCCFD,
      color: #073E6D
    ), (
      period: 'Yatsi',
      bg: #2E3B83,
      color: #BAE6FF
    );

    $order: (
      name: 'first',
      grow: 50,
      darken: 0,
      fontSize: 2.3em
    ), (
      name: 'second',
      grow: 22,
      darken: 5,
      fontSize: 1.6em
    ), (
      name: 'third',
      grow: 18,
      darken: 9,
      fontSize: 1.4em
    ), (
      name: 'fourth',
      grow: 14,
      darken: 13,
      fontSize: 1.2em
    ), (
      name: 'fifth',
      grow: 10,
      darken: 16,
      fontSize: 1.1em
    ), (
      name: 'sixth',
      grow: 6,
      darken: 18,
      fontSize: 1em
    );

    @for $i from 1 through length($theme) {
      $a: nth($theme, $i);
      @for $j from 1 through length($order) {
        $b: nth($order, $j);
        .Times.#{map-get($a, period)} & {
          &.#{map-get($b, name)} {
            z-index: length($order) - $j;
            flex-grow: map-get($b, grow);
            color: map-get($a, color);
            background-color: desaturate(darken(map-get($a, bg), map-get($b, darken)), map-get($b, darken));
            .content {
              opacity: 1 - ($j - 1) / 10;
              font-size: map-get($b, fontSize);
            }
          }
        }
      }
    }

  }

  .t-enterLeft-enter-active, .t-enterLeft-leave-active {
    transition: .2s;
  }

  .t-enterLeft-enter, .t-enterLeft-leave-to {
    opacity: 0;
  }

</style>
