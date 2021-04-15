<template lang="pug">
  .f2e1-02.content
    .banner
      .content-wrap
        .logo
          h1 HaveFun
        .search
          p
            fas-icon(icon="search")
            input(v-model="searchAny" placeholder="Explore your own activities")

    .main.content-wrap
      .nav
        .filter-control
          section.location
            p Location
            input(v-model="searchLocation")
          section.date
            p Date
            input(v-model="searchDate")
          section.categories
            p Categories
            ul
              li.tag(v-for="location in locations")
                input(type="checkbox")
                label {{location}}
      .info
        .filter-ruler
          p Shopwing result by {{filteredDatas.length}} ...
          p
            span {{searchAny}}
          p.tags
            span.tag
        .list-card
          section(v-for="data in filteredDatas" :key="data.id")
            .card-img
              img(:src="data.cover_image" :alt="data.title")
            .card-body
              h2.title {{data.title}}
              p.address {{data.address}}
              p.phone {{data.phone}}
              p.location {{data.location}}
              p.ticket_price {{data.ticket_price}}
              p.traffic_guideline {{data.traffic_guideline}}
              p.mrt {{data.mrt}}
              p.type {{data.type}}
</template>

<script>
export default {
  name: 'F2E1th02',
  data () {
    return {
      msg: 'th1-02',
      api: '/attractions.json',
      // api: '/taiepibsstr.json',
      datas: [],
      searchAny: '',
      searchLocation: '',
      searchDate: ''
    }
  },
  watch: {
    // searchAny: {
    //   immediate: true,
    //   handler () {
    //     // this.filterDataHandler()
    //   }
    // }
  },
  computed: {
    filteredDatas () {
      let keyword = this.searchAny
      if (keyword) {
        let reg = new RegExp(keyword, 'ig')
        return this.datas.filter(e =>
          Object.keys(e).some(key =>
            e[key].match(reg)
          )
        )
      }
      return [...this.datas]
    },
    locations () {
      return this.datas.map(data => data.location).reduce((acc, item) => {
        return acc.includes(item) ? acc : [...acc, item]
      }, []
      )
    }
  },
  created () {
    this.dataGet()
  },
  methods: {
    dataGet () {
      this.$http.get(`${this.HOST}${this.api}`).then((res) => {
        this.datas = [...res.data.data]
        this.customDatas()
      })
    },
    customDatas () {
      this.datas.forEach(data => {
        if (data.address.indexOf('區') > 0) {
          data.location = `${data.address.split('區', 1).join().slice(-2)}區`
          return
        }
        data.location = ''
      })
    }
  }
}
</script>

<style lang="scss">
// @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.css');
.f2e1-02 {
  --color-main-1: #7828B4;
  --color-main-2: #9013FE;
  // --color-red-1: #D0021B;
  // --color-yellow-1: #F5A623;
  // --color-yellow-2: #FFF2DC;
  --color-gray-1: #9B9B9B;
  --color-gray-2: #D7D7D7;
  --color-gray-3: #EBEBEB;
  --color-gray-4: #F2F2F2;
  --color-gray-5: #EEE;
  --width-content-wrap: 1000px;
  --width-left-pannel: 300px;
  .content-wrap {
    max-width: var(--width-content-wrap);
    @extend %mg-auto;
    outline: blue;
  }
  .test {
    section img {
      max-width: 200px;
    }
  }
  // * {
  //   outline: 1px solid red;  //test
  // }
  font-size: 1rem;
  background: var(--color-gray-4);
  .banner {
    background-color: var(--color-main-1);
    color: white;
    .content-wrap {
      display: flex;
    }
    .logo {
      width: var(--width-left-pannel);
      @extend %flex-center;
      h1 {
      }
    }
    .search {
      flex: 1;
      input {
        color: #fff;
        background-color: transparent;
        outline: transparent;
        border: transparent;
        border-bottom: 1px solid white;
        padding-left: 1.5rem;
        margin-left: -1rem;
        &::placeholder {
          color: var(--color-gray-5);
        }
      }
    }
  }
  .main {
    display: flex;
    .nav {
      width: var(--width-left-pannel);
      .filter-control {
        padding: 10px 20px;
        background: var(--color-gray-3);;
        section.location {
        }
        section.date {
        }
        section.categories {
        }
      }
    }
    .info {
      .list-card {
        flex: 1;
        section {
          border: 1px solid #ddd;
          box-shadow: 0px 0px 2px #ddd;
          margin: 10px 20px;
          background-color: #fff;
          display: flex;
          .card-img {
            @include size(230px);
            @extend %flex-center;
            overflow: hidden;
            img {
              @include size(auto, 100%);
            }
          }
          .card-body {
            flex: 1;
            .title {
              color: var(--color-main-1);
            }
          }
        }
      }
    }
  }
}
</style>
