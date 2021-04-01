// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'reset-css'
import 'animate.css'
import Element from 'element-ui'
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
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Element)
//  Vue.component(Select.name, Select)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
