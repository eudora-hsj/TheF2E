<template lang="pug">
  .f2e1-02.container
</template>

<script>
export default {
  name: 'F2E1th02',
  data () {
    return {
      msg: 'th1-02',
      api: '/attractions.json'
    }
  },
  created () {
    this.dataGet()
  },
  methods: {
    dataGet () {
      this.$http.get(`${this.HOST}${this.api}`).then((res) => {
        console.log(res.data.data)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
