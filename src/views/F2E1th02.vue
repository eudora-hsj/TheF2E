<template lang="pug">
  .f2e1-02.content
    .banner.content-fluid
      .logo
        h1 HaveFun
      .search
        section.location
        section.date
        section.categories
    .nav
      .filter-control
    .main
      .test
        section(v-for="data in datas" :key="data.id")
          p {{data.title}}
          p {{data.address}}
          p {{data.phone}}
          p {{data.ticket_price}}
          p {{data.traffic_guideline}}
          p {{data.mrt}}
          p {{data.type}}
          img(:src="data.cover_image")
      .filter-ruler
        p
        | Shopwing result by
        p.tags
          span.tag
      .list-card
</template>

<script>
export default {
  name: 'F2E1th02',
  data () {
    return {
      msg: 'th1-02',
      api: '/attractions.json',
      // api: '/taiepibsstr.json',
      datas: []
    }
  },
  created () {
    this.dataGet()
  },
  methods: {
    dataGet () {
      this.$http.get(`${this.HOST}${this.api}`).then((res) => {
        this.datas = [...res.data.data]
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.css');
.f2e1-02 {
  .test {
    section img {
      max-width: 200px;
    }
  }
  --color-purple-1: #7828B4;
  --color-purple-2: #9013FE;
  // --color-red-1: #D0021B;
  // --color-yellow-1: #F5A623;
  // --color-yellow-2: #FFF2DC;
  --color-gray-1: #9B9B9B;
  --color-gray-2: #D7D7D7;
  --color-gray-3: #EBEBEB;
  --color-gray-4: #F2F2F2;
  --width-content-max: 620px;
  font-size: 1rem;
  .banner {
    background-color: var(--color-blue-1);
  }
}
</style>
