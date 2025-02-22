import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/view-ui/iview.js'
import '@/plugins/lodash'
import '@/plugins/moment'
import '@/plugins/json-edit'
import '@/directives/has-per'
import '@/plugins/vue-viewer'
import '@/plugins/v-clipboard'
import '@/plugins/icon-svg'
import axios from '@/plugins/axios/api'
import Config from '@/config'
import VueCookies from 'vue-cookies'

import '@/assets/styles/base.less'
import '@/assets/styles/custom-icon.less'
import CustomIcons from '@/components/custom-icon/custom-icon.vue'
import DictSelect from '@/components/dict-select'
import IconSvg from '@/components/icon-svg'
import HEmpty from '@/components/h-empty'
import HLoading from '@/components/h-loading'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
Vue.use(VueCookies)
// 判断权限
const hasPermission = userPermission => {
  const userPermissionList = Array.isArray(userPermission)
    ? userPermission
    : [userPermission]
  return store.getters.hasPer(userPermissionList)
}

Vue.prototype.$ddr = DynamicDrawerUtil
Vue.prototype.$config = Config

Vue.http = Vue.prototype.$http = axios
// 全局判断方法
Vue.prototype.$_has = hasPermission

// Vue.config.productionTip = false
Vue.component('custom-icon', CustomIcons)
Vue.component('dict-select', DictSelect)
Vue.component('h-empty', HEmpty)
Vue.component('icon-svg', IconSvg)
Vue.component('h-loading', HLoading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
