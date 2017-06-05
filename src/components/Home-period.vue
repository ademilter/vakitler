<template lang="pug">
  transition(name='t-enterFade')
    .Period(:class="[Name, Order]")
      transition(name='t-enterFade')
        .Period-counter(v-if="Order === 'first'", v-show="percentCounter", :style="{ bottom:  newBottomValue + '%' }")
          .count
            span.dash –
            span.bold {{ Counter[0] }}
            span :
            span.bold {{ Counter[1] }}
            span :
            span.bold {{ Counter[2] }}
          svg(:viewbox="svgViewbox")
            polygon(fill="#fff", fill-rule="evenodd", :points="svgPoints")
      .Period-content
        .name {{ $t(Name.toLowerCase()) }}
        .time.bold {{ Time }}
      .Period-bar(v-if="Order === 'first'")
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Period',
    props: ['Name', 'Time'],
    data () {
      return {
        kutuYuksekligi: 0
      }
    },
    computed: {
      ...mapGetters([
        'Periods',
        'currentPeriod',
        'Counter',
        'secCounter',
        'percentCounter'
      ]),
      Order () {
        const ORDER_CLASS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
        const PERIODS = _.keys(this.Periods)
        const CURRENT_INDEX = _.indexOf(PERIODS, this.currentPeriod)
        const THIS_INDEX = _.indexOf(PERIODS, this.Name)
        return ORDER_CLASS[Math.abs(THIS_INDEX - CURRENT_INDEX)]
      },
      svgW () {
        return 110
      },
      svgH () {
        return this.svgW * (46 / 164)
      },
      svgViewbox () {
        return `0 0 ${this.svgW} ${this.svgH}`
      },
      svgPoints () {
        return `0 0 ${this.svgW - (this.svgH / 2)} 0 ${this.svgW} ${this.arrowNewValue} ${this.svgW - (this.svgH / 2)} ${this.svgH} 0 ${this.svgH}`
      },
      maxBottomValue () {
        let ok = this.svgH / 2
        return ok / this.kutuYuksekligi * 100
      },
      whatLocation () {
        let pc = this.percentCounter
        let mv = this.maxBottomValue
        if (pc > 100 - mv) {
          return 'top'
        } else if (pc < mv) {
          return 'bottom'
        } else {
          return 'center'
        }
      },
      newBottomValue () {
        if (this.whatLocation === 'top') {
          return (100 - this.maxBottomValue).toFixed(2)
        } else if (this.whatLocation === 'bottom') {
          return this.maxBottomValue.toFixed(2)
        } else {
          return this.percentCounter.toFixed(2)
        }
      },
      arrowNewValue () {
        const svgHalf = this.svgH / 2
        if (this.whatLocation === 'top') {
          return svgHalf / this.percentCounter
        } else if (this.whatLocation === 'bottom') {
          return svgHalf + (svgHalf / this.percentCounter)
        } else {
          return svgHalf
        }
      }
    },
    methods: {
      setKutuYuksekligi () {
        const h = document.querySelector('.first').offsetHeight || 0
        this.kutuYuksekligi = h
      }
    },
    mounted () {
      this.setKutuYuksekligi()
      window.onresize = (event) => {
        this.setKutuYuksekligi()
      }
    }
  }
</script>

<style lang="scss">

  .Period {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    background-color: #eee;
    transition: .2s;

    $theme: (
      period: 'Imsak',
      bg: #D2F2FF,
      color: #1281A2,
      dark: false
    ), (
      period: 'Gunes',
      bg: #FFEBC1,
      color: #A6601E,
      dark: false
    ), (
      period: 'Ogle',
      bg: #FFEDA3,
      color: #804502,
      dark: false
    ), (
      period: 'Ikindi',
      bg: #FFD8BA,
      color: #8F361A,
      dark: false
    ), (
      period: 'Aksam',
      bg: #8BCCFD,
      color: #073E6D,
      dark: false
    ), (
      period: 'Yatsi',
      bg: #2E3B83,
      color: #BAE6FF,
      dark: true
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

      @at-root .Times.#{map-get($a, period)} {
        color: map-get($a, color);
      }

      // theme & size
      @for $j from 1 through length($order) {
        $b: nth($order, $j);

        .Times.#{map-get($a, period)} & {
          &.#{map-get($b, name)} {
            transition-delay: #{$j * 100}ms;
            z-index: length($order) - $j;
            flex-grow: map-get($b, grow);
            background-color: desaturate(darken(map-get($a, bg), map-get($b, darken)), map-get($b, darken));
            .Period-content {
              opacity: 1 - ($j - 1) / 10;
              font-size: map-get($b, fontSize);
            }
            .Period-counter {
              @if (map-get($a, dark)) {
                color: map-get($a, bg);
              }
              else {
                color: map-get($a, color);
              }
            }
          }
        }
      }

      // order
      @for $k from 1 through length($theme) {
        $c: nth($theme, $k);
        .Times.#{map-get($a, period)} & {
          &.#{map-get($c, period)} {
            order: $k;
          }
        }
      }

    }

    &-content {

      .name {
        font-size: .8em;
      }

      .time {
        margin-top: 4px;
        font-size: 1.1em;
      }

    }

    &-counter {
      position: absolute;
      right: 10px;
      transform: translateY(50%);
      width: 110px;
      filter: drop-shadow(0 1px 2px rgba(black, .06));

      // aspect-ratio box
      &:before {
        content: "";
        display: block;
        padding-top: percentage(46/164); // svg h/w
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
            margin-top: -3px;
          }
        }
      }

      svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

    }

    &-bar {
      z-index: 2;
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      height: 100%;
      background-color: currentColor;
    }

  }

  .t-enterFade-enter-active, .t-enterFade-leave-active {
    transition: .6s;
  }

  .t-enterFade-enter, .t-enterFade-leave-to {
    opacity: 0;
  }

</style>
