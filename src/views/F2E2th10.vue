<template lang="pug">
  .content
    .layoutMenu
      //- h1 {{msg}}
      el-select(v-model="curCounty" placeholder="城市")
        el-option(v-for="county in countyList" :key="county" :label="county" :value="county").
      p
      el-select(v-model="curTown" placeholder="城鄉")
        el-option(v-for="town in countyTownObj[curCounty]" :key="town" :label="town" :value="town").
      p {{curShopCount}}
      el-card.box-card.shopInfo(v-for='shop in curShopInfo' :key='shop.id')
        .clearfix(slot='header')
          h3 {{ shop.name }}
          el-button(style='float: right; padding: 3px 0' type='text') Go
        .text.item {{ shop.address }}
        .text.item {{ shop.phone }}
        .text.item {{ shop.mask_adult }}
        .text.item {{ shop.mask_child }}
    .layoutMap
      <Map/>
</template>

<script>

import Map from '../components/th2-10/map.vue'

export default {
  name: 'F2E2th10',
  components: {
    Map
  },
  data () {
    return {
      msg: 'th2-10：口罩地圖',
      apiUrl: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',
      params: {
        account: '',
        password: ''
      },
      resData: {},
      dataItems: [],
      countyList: [],
      curCounty: '',
      countyTownObj: {},
      curTown: '',
      curShopInfo: [],
      curShopCount: null
    }
  },
  mounted () {
    // this.initMap()
    // this.importJSFile('leafletJS', 'https://npmcdn.com/leaflet@0.7.7/dist/leaflet.js')
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http
        .get(this.apiUrl, {
        })
        .then((res) => {
          this.resData = res.data.features
          this.setData(this.resData)
          console.log(this.resData[0].properties)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setData (oriData) {
      let data = JSON.parse(JSON.stringify(oriData))
      // 只留下需要的資料
      let dataItems = data.map(data => data.properties)
      this.dataItems = dataItems
      // dataItems.forEach(item => {
      //   delete item[cunli]
      //   delete item[id]
      // })
      // console.log(dataItems)
      // 所有縣市清單 county
      let countyList = new Set()
      let countyTownObj = {}
      dataItems.forEach(item => {
        if (item.county) countyList.add(item.county)
      })
      this.countyList = countyList
      // 所有縣市內城清單(obj) Town
      countyList.forEach(county => {
        countyTownObj[county] = []
      })
      dataItems.forEach(item => {
        if (countyTownObj[item.county] && countyTownObj[item.county].indexOf(item.town) === -1) {
          countyTownObj[item.county].push(item.town)
        }
      })
      this.countyTownObj = countyTownObj
    },
    showShopInfo () {
      this.curShopInfo = this.dataItems.filter(item => item.county === this.curCounty && item.town === this.curTown)
    }
    // ,
    // importJSFile (tagId, url) {
    //   // import leaflet js
    //   if (document.getElementById(tagId)) return // was already loaded
    //   var scriptTag = document.createElement('script')
    //   scriptTag.src = url
    //   scriptTag.id = tagId
    //   document.getElementsByTagName('head')[0].appendChild(scriptTag)
    // },
    // initMap () {
    //   var map = L.map('map')
    //   // 設定經緯度座標
    //   map.setView(new L.LatLng(22.992, 120.239), 12)
    //   // 設定圖資來源
    //   var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //   var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 16})
    //   map.addLayer(osm)
    // }
  },
  computed: {
    // curShopCount () {
    //   if (this.curTown.length) return this.curTown.length
    // }
  },
  watch: {
    // auto select first town
    curCounty (val) {
      this.curTown = this.countyTownObj[val][0]
      // this.showShopInfo()
      // this.curShopCount = this.curTown.length
    },
    curTown (val) {
      this.showShopInfo()
      this.curShopCount = this.curTown.length
    }
  }
}
</script>

<style lang="scss">
@import url('https://npmcdn.com/leaflet@0.7.7/dist/leaflet.css');
body {
  // height: 100vh;
}
.content {
  display: flex;
  padding: 10px;
  height: 100vh;
  & > div {
    outline: 1px dotted #ccc;
    padding: 10px;
  }
  .layoutMenu {
    max-width: 300px;
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    .el-input {
      margin-bottom: 5px;
    }
  }
  .layoutMap {
    flex: 1;
  }
  .shopInfo {
    .text {
      // font-size: 14px;
    }

    .item {
      // margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      // width: 480px;
    }
  }
}
</style>
