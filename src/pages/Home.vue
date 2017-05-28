<template lang="pug">
  //h1 {{ $t('globals.msg') }}
  div
    h3 İl: {{ il }}
    h3 İlçe: {{ ilce }}
    h2 Tarih: {{ zaman.gun }}.{{ zaman.ay }}.{{ zaman.yil }}
    div(v-for="(vakit, key) in vakitler")
      b {{ $t('globals.' + key) }}:
      span {{ vakit }}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters([
        'il',
        'ilce',
        'zaman',
        'vakitler'
      ])
    },
    methods: {
      ...mapActions([
        'getTimes'
      ])
    },
    mounted () {
      this.getTimes()
    }
  }
</script>
