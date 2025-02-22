import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from '@/config'
import store from '@/store'
import ConstantRoutes from './routes'
import _ from 'lodash'
import { Message } from 'view-design'
Vue.use(VueRouter)
const router = new VueRouter({
  base: '/gdss/',
  routes: _.cloneDeep(ConstantRoutes)
})
const LoginRouteName = 'login'
// 如果用户已经登录

const doAuthAction = (to, from, next) => {
  // 检查用户授权信息
  let targetRoute = true
  store.dispatch('checkAuthInfo').then(() => {
    if (!to.matched || _.isEmpty(to.matched)) {
      targetRoute = {
        name: 'errorDeveloping'
      }
      // 重新匹配
      const tg = router.resolve(to.path)
      targetRoute = {
        name: tg.route.name,
        query: { _: Math.random() }
      }
    } else {
      if (to.name === LoginRouteName) {
        if (from.name && from.name !== LoginRouteName) {
          targetRoute = {
            name: from.name,
            query: { redirect: to.fullPath }
          }
          next(targetRoute)
        } else {
          // 如果已经登录，并且跳转页面是登陆页面，则自动跳转到工作页面。
          store.dispatch('goHome').catch(e => { })
        }
        return
      }
    }
    next(targetRoute)
  }).catch(err => {
    const { name, message } = err
    Message.error(message)
    if (name === 'auth-err') {
      // 重新登陆
      window.$cookies.remove(Config.TokenHeader)
      targetRoute = {
        name: LoginRouteName,
        query: { redirect: to.fullPath }
      }
    }
    // 跳转到联系管理员页面。
    next(targetRoute)
  })
}
const doNoAuthAction = (to, from, next) => {
  let targetRoute = true
  const { meta: { noAuth } } = to
  if (noAuth === true) {
    next(targetRoute)
  } else if (to.name !== LoginRouteName) {
    targetRoute = {
      name: LoginRouteName,
      query: { redirect: to.fullPath }
    }
  }
  next(targetRoute)
}
router.beforeEach(async (to, from, next) => {
  store.commit('loadStatus', true)
  const isLogin = window.$cookies.get(Config.TokenHeader)
  if (isLogin) {
    doAuthAction(to, from, next)
  } else {
    doNoAuthAction(to, from, next)
  }
})

router.afterEach(() => {
  store.commit('loadStatus', false)
})

router.onError(async (error) => {
  console.log('router error', error)
})

export default router
