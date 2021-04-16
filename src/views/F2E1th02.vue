<template lang="pug">
  .f2e1-02.content
    .banner
      .content-wrap
        .logo
          h1 HaveFun
    .main
      .content-wrap
        .nav
          .filter-control
            section.search
              p
                fas-icon(icon="search")
                input(v-model="searchAny" placeholder="search... (Any keyword)")
                fas-icon.close(icon="times" @click="searchAny=''")
            section.location-list
              p.location
                input(type="checkbox" id="all" v-model="isCheckedAll")
                label(for="all") All
              p.location(v-for="location in locations" :key="location")
                input(type="checkbox" :value="location" :id="location" v-model="locationChecked")
                label(:for="location") {{location}}
        .info
          .filter-ruler
            p.count result by #[span {{filteredDatas.length}}] ...
            p.tags
              span.keyword(v-show="searchAny.trim().length > 0") {{searchAny}}
              span.tag(v-show="locationChecked.length" v-for="location in locationChecked" :key="location") {{location}}
                fas-icon.del(icon="times" @click="locationChecked.splice(locationChecked.indexOf(location), 1)")
          .list-cards
            section.card(v-for="data in filteredDatas" :key="data.id")
              .card-img
                img(:src="data.cover_image" :alt="data.title")
              .card-body
                h2.title {{data.title}}
                p.address #[fas-icon(icon="map-marker-alt")] {{data.address}}
                p.phone {{data.phone}}
                p.location {{data.location}}
                p.ticket {{data.ticket_price}}
                p.traffic {{data.traffic_guideline}}
                p.mrt {{data.mrt}}
                p.type {{data.type}}
                p.updated #[fas-icon(icon="calendar-alt")] {{data.updated_at}}
</template>

<script>
export default {
  name: 'F2E1th02',
  data () {
    return {
      msg: 'th1-02',
      api: '/attractions.json',
      datas: [],
      searchAny: '',
      searchLocation: '',
      locationChecked: [],
      isCheckedAll: false
    }
  },
  watch: {
    isCheckedAll: function () { // can't use arrow
      this.locationChecked = this.isCheckedAll ? [...this.locations] : []
    }
  },
  computed: {
    filteredDatas () {
      let result = [...this.datas]
      let keyword = this.searchAny.trim()
      let checkedLocations = this.locationChecked
      function filterKeyword (keyword) {
        let reg = new RegExp(keyword, 'ig')
        result = result.filter(data =>
          Object.keys(data).some(key =>
            data[key].match(reg)
          )
        )
      }
      function filterLocation (location) {
        result = result.filter(data =>
          location.includes(data.location)
        )
      }
      if (keyword.length) {
        filterKeyword(keyword)
      }
      if (checkedLocations.length) {
        filterLocation(checkedLocations)
      }
      return result
    },
    locations () {
      return this.datas.map(data => data.location).reduce((acc, item) => {
        return acc.includes(item) || !item ? acc : [...acc, item]
      }, []
      ).sort()
    }
  },
  created () {
    this.dataGet()
  },
  methods: {
    dataGet () {
      this.$http.get(`${this.HOST}${this.api}`)
        .then((res) => {
          this.datas = [...res.data.data]
          this.customDatas()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    customDatas () {
      this.datas.forEach(data => {
        // location
        if (data.address.indexOf('區') === 5) {
          data.location = `${data.address.split('區', 1).join().slice(-2)}區`
        } else {
          data.location = '(未標示)'
        }
        // updated formate
        data.updated_at = data.updated_at.substr(0, 10)
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
  --color-black-1: #333;
  --color-black-2: #555;
  --color-gray-1: #9B9B9B;
  --color-gray-2: #D7D7D7;
  --color-gray-3: #EBEBEB;
  --color-gray-4: #F2F2F2;
  --color-gray-5: #EEE;
  --width-content-wrap: 1000px;
  --width-left-pannel: 300px;
  @mixin bright($bri: 1.5) {
    filter: brightness ($bri);
  }
  .content-wrap {
    max-width: var(--width-content-wrap);
    @extend %mg-auto;
    outline: blue;
  }
  font-size: 1rem;
  color: var(--color-black-1);
  .banner {
    background-color: var(--color-main-1);
    color: white;
    .logo {
      width: var(--width-left-pannel);
      @extend %flex-center;
      h1 {
        font-size: 2rem;
        font-weight: bold;
        margin: 1rem 0;
      }
    }
  }
  .main {
    background: var(--color-gray-4);
    min-height: calc(100vh - 48px);
    .content-wrap {
      @extend %flex;
    }
    .nav {
      width: var(--width-left-pannel);
      .filter-control {
        @include size(90%, 100%);
        padding: 10px 20px;
        background: var(--color-gray-3);
        .location-list {
          .location {
            @extend %flex-ai-center;
            line-height: 2.5rem;
            input {
              @include size(1.6rem);
              border: none;
              &:checked {
                &+label {
                  color: var(--color-main-1);
                  font-weight: bold;
                }
              }
            }
            label {
              @extend %w100;
              @extend %pointer;
              font-size: 1.2rem;
            }
          }
        }
        .search {
          padding: 1rem;
          svg {
            color: var(--color-main-1);
            font-size: 1.5rem;
            display: inline-block;
          }
          &:hover {
            input {
              @include bright(1.1);
            }
          }
          .close {
            @extend %pointer;
            &:hover {
              @include bright;
            }
          }
          input {
            @extend %w100;
            color: var(--color-main-1);
            background-color: transparent;
            outline: transparent;
            border: transparent;
            border-bottom: 1px solid var(--color-main-1);
            padding: .2rem .2rem .5rem 2.2rem;
            margin: auto -1rem auto -1.6rem;
            font-size: 1.5rem;
            &::placeholder {
              font-weight: normal;
              font-size: 1.2rem;
              color: var(--color-gray-1);
            }
          }
        }
      }
    }
    .info {
      flex: 1;
      .filter-ruler {
        min-height: 94px;
        padding: 10px 0;
        .tags {
          margin: 10px 0;
          line-height: 3rem;
          span {
            padding: 5px 10px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .del {
            margin-left: .5rem;
            &:hover {
              @include bright;
              transform: scale(1.2);
              @extend %pointer;
            }
          }
          .keyword {
            border:1px solid var(--color-main-2);
            color: var(--color-main-2);
          }
          .tag {
            border:1px solid var(--color-main-1);
            color: var(--color-main-1);
            word-break: keep-all;
            display: inline-block;
            line-height: 1.3rem;
          }
        }
        .count {
          font-size: 1.3rem;
          span {
            color: var(--color-main-1);
            font-weight: bold;
            font-size: 1.4rem;
          }
        }
      }
      .list-cards {
        .card {
          border: 1px solid #ddd;
          box-shadow: 0px 0px 2px #ddd;
          margin: 10px 20px;
          background-color: #fff;
          @extend %flex;
          .card-img {
            @include size(230px);
            @extend %flex-center;
            overflow: hidden;
            img {
              @include size(auto, 100%);
            }
          }
          .card-body {
            position: relative;
            flex: 1;
            font-size: 1.1rem;
            padding: 1rem 1.5rem;
            p {
              line-height: 1.5rem;
              margin-top: .5rem;
            }
            .title {
              font-size: 2rem;
              line-height: 3rem;
              color: var(--color-main-1);
              border-bottom: 1px dotted #ddd;
            }
            .address {
              color: var(--color-main-2);
            }
            .location {
              @include abpos-rt(-5px, 8px);
              border: 1px solid var(--color-main-1);
              color: white;
              background-color: var(--color-main-1);
              display: inline-block;
              padding: 3px 8px;
              font-size: 0.9rem;
              margin-top: 0rem;
            }
            .traffic {
              color: var(--color-black-2);
            }
            .updated {
              text-align: right;
              color: var(--color-gray-1);
              font-size: 0.8rem;
              @include abpos-rb(10px, 10px);
            }
          }
        }
      }
    }
  }
}
</style>
