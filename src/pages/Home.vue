<template lang="pug">
  .Times(:class="vakit")
    Period(v-for="(Vakit, Key) in vakitler", :Key="Key", :Vakit="Vakit", :key="Key")
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Period from '@/components/Home-period.vue'

  export default {
    name: 'Home',
    components: {
      Period
    },
    computed: {
      ...mapGetters([
        'il',
        'ilce',
        'zaman',
        'vakit',
        'vakitler'
      ])
    },
    methods: {
      ...mapActions([
        'getTimes'
      ]),
      ...mapMutations([
        'setVakit'
      ])
    },
    mounted () {
      this.getTimes()
      setInterval(() => {
        this.setVakit()
      }, 60000)
    }
  }
</script>

<style lang="scss">

  .Times {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
