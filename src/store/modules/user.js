// import SessionUtil from '@/utils/SessionStorageUtil'
import FrontUserApi from '@/api/auth/user'
import Config from '@/config'
import _ from 'lodash'
export default {
  state: {
    // 用户基本信息
    userInfo: {}
  },
  getters: {
    isEmptyUserInfo: state => () => _.isNil(state.userInfo) || _.isEmpty(state.userInfo)
  },
  mutations: {
    /**
     * 设置前端用户基本信息
     * @author hsc
     * @date 2019-12-10
     * @param {*} state
     * @param {*} pyload
     */
    setUserInfo: (state, pyload) => {
      state.userInfo = pyload
      localStorage.setItem('nickName', pyload.nickName)
      console.log('setUserInfo... success')
    }
  },
  actions: {
    // 退出登录|清除登录信息 action
    async logout ({ dispatch, commit }) {
      // 清除用户信息
      await commit('setUserInfo', {})
      // 清除路由信息
      await dispatch('clearRoutes')
      // 清空菜单信息
      await dispatch('clearMenus')
      // 清除token
      window.$cookies.remove(Config.TokenHeader)
    },

    /**
     *
     * 获取认证信息 action
     * @author hsc
     * @date 2019-12-11
     * @param {*} { dispatch, commit }
     * @returns
     */
    async initAuthInfo ({ commit }) {
      var err = new Error()
      err.name = 'auth-error'
      err.message = '获取认证信息失败'
      try {
        const res = await FrontUserApi.getAuthUserInfo()
        const { status, data } = res
        if (status === 200 && data.isOk) {
          commit('setUserInfo', data.data || {})
        } else {
          throw err
        }
      } catch (error) {
        throw err
      }
    }
  }
}
