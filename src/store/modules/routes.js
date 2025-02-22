import FrontUserApi from '@/api/auth/user'
import DynamicRouteUtil from '@/utils/DynamicRouteUtil'
import VueRouter from 'vue-router'
import router from '@/router'
import ConstantRoutes from '@/router/routes'

import _ from 'lodash'
import CommonUtil from '@/utils/CommonUtil'
export default {
  state: {
    // 用户拥有的route
    routes: []
  },
  mutations: {
    setRoutes (state, pyload) {
      state.routes = pyload || []
    }
  },
  getters: {
    isEmptyRoutes: state => () => _.isNil(state.routes) || _.isEmpty(state.routes)
  },
  actions: {
    /**
     *
     * 清除前端routes
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async clearRoutes ({ commit }) {
      commit('setRoutes', [])
    },
    async initAuthUserRoutes ({ commit, dispatch }) {
      var err = new Error()
      err.name = 'auth-routes-error'
      err.message = '获取用户路由权限失败'
      try {
        const res = await FrontUserApi.getAuthUserRoutes()
        const { status, data } = res
        if (status === 200 && data.isOk) {
          // 设置基本信息

          if (data.data && !_.isEmpty(data.data)) {
            commit('setRoutes', data.data)
            await dispatch('rebuildRoutes')
          } else {
            err.name = 'auth-routes-empty-error'
            err.message = '未分配路由权限'
            // 未分配路由
            // throw err
          }
        } else {
          throw err
        }
      } catch (error) {
        throw err
      }
    },

    /**
     *初始化 routes
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     * @param {*} paload： router
     * @returns
     */
    async rebuildRoutes ({ state }) {
      if (!_.isEmpty(state.routes)) {
        // 设置前端路由
        const _routes = DynamicRouteUtil.convertToRoutes(state.routes)
        console.log(_routes)
        const newRouter = new VueRouter({
          routes: _.cloneDeep(ConstantRoutes)
        })
        router.options.routes = _.cloneDeep(ConstantRoutes)
        router.matcher = newRouter.matcher

        _routes.forEach(_r => {
          router.addRoute(_r)
        })
      }
      return true
    },

    /**
     * 跳转到首页
     * @author hsc
     * @date 2020-07-14
     * @param {*} { dispatch, getters }
     */
    async goHome ({ dispatch, getters }) {
      const firstMenu = CommonUtil.firstLeaf(getters.getMenus())
      if (!_.isEmpty(firstMenu)) {
        await dispatch('goTargetRoute', firstMenu)
      } else {
        await dispatch('goTargetRoute', {
          path: '/errorPage/404/菜单消失了，请稍后再试'
        })
      }
    },

    /**
     * 跳转到指定路由页面
     * @param {*} context
     * @param {*} menu
     */
    goTargetRoute ({ dispatch }, menu) {
      return new Promise((resolve, reject) => {
        let query = {}
        let params = {}
        if (_.isString(menu.query)) {
          try {
            query = JSON.parse(menu.query)
          } catch (error) { }
        } else {
          query = menu.query
        }
        if (_.isString(menu.params)) {
          try {
            params = JSON.parse(menu.params)
          } catch (error) { }
        } else {
          params = menu.params
        }
        const { routeName, path } = menu
        if (_.isEmpty(routeName)) {
          router.push(
            { path: path, query: Object.assign({}, query, { _: Math.random() }) },
            () => {
              resolve()
            },
            e => {
              reject(e)
            }
          )
        } else {
          router.push(
            { name: routeName, query: Object.assign({}, query, { _: Math.random() }), params: Object.assign({}, params) },
            () => {
              resolve()
            },
            e => {
              reject(e)
            }
          )
        }
      })
    }
  }
}
