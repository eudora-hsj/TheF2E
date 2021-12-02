// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App'
import router from './router'
import 'reset-css'
import 'animate.css'
// import Element from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// library.add(faPlus)
// import {
//   Select,
//   Button
//   // ...
// } from ' element-ui'
import axios from 'axios'

// Map - leaflet (for 2th10)
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
//
Vue.prototype.$http = axios
Vue.prototype.HOST = '/api'

library.add(fas, far)
Vue.component('fas-icon', FontAwesomeIcon)

Vue.use(Vuex)
Vue.use(ElementUI)
//  Vue.component(Select.name, Select)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
