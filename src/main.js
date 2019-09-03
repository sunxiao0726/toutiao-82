import Vue from 'vue'
import App from './App.vue'
import router from './permission.js'
import Component from './components'// 自定义组件，主要用于写路由
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'

import Axios from 'axios'

Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = Axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
