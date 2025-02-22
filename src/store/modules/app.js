import _ from 'lodash'
export default {
  state: {},
  mutations: {},
  actions: {

    /**
     *检查用户配置，如果信息缺失，则重新获取
     *
     * @author hsc
     * @date 2019-12-11
     * @param {*} { getters, dispatch }
     * @param {*} router
     */
    async checkAuthInfo ({ getters, dispatch }) {
      const promises = []
      if (getters.isEmptyUserInfo()) {
        promises.push(dispatch('initAuthInfo'))
      }
      if (getters.isEmpytUserMenus()) {
        promises.push(dispatch('initAuthMenus'))
      }
      if (getters.isEmptyRoutes()) {
        promises.push(dispatch('initAuthUserRoutes'))
      }
      if (!_.isEmpty(promises)) {
        return Promise.all(promises)
      }
    }

  }
}
