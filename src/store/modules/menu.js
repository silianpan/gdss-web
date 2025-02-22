import SessionUtil from '@/utils/SessionStorageUtil'
import AuthUserApi from '@/api/auth/user'
import _ from 'lodash'
import CommonUtil from '../../utils/CommonUtil'
export default {
  state: {
    // 用户拥有的权限菜单
    menus: [],
    // 二维菜单
    hashMapMenus: [],
    // // sider-bar 激活菜单的 name 值
    siderBarActiveMenuName: SessionUtil.get('sider-active-menu-name', '')
  },
  getters: {
    // 当前菜单信息
    currentMenu: state => {
      const hashMapMenus = state.hashMapMenus || []
      const cm =
        hashMapMenus.find(menu => menu.id === state.siderBarActiveMenuName) ||
        {}
      return cm
    },
    getUpMenu: (state, getters) => {
      // 找到此上一级菜单
      const hashMapMenus = state.hashMapMenus || []
      const pm = getters.getParentMenu
      let up = {}
      if (!_.isEmpty(hashMapMenus)) {
        up = hashMapMenus.find(menu => menu.id === pm.pid)
      }
      return up || CommonUtil.firstLeaf(getters.getMenus())
    },
    // 上一级菜单
    getParentMenu: (state, getters) => {
      const hashMapMenus = state.hashMapMenus || []
      const cm = getters.currentMenu
      let pm = {}
      if (!_.isEmpty(hashMapMenus)) {
        pm = hashMapMenus.find(menu => menu.id === cm.pid)
      }
      return pm
    },
    // 兄弟菜单
    getBrotherMenus: (state, getters) => {
      // 根据 激活的 siderBarActiveMenuName 找到此兄弟菜单
      const hashMapMenus = state.hashMapMenus || []
      const cm = getters.currentMenu
      let bms = {}
      if (!_.isEmpty(hashMapMenus)) {
        bms = hashMapMenus.filter(menu => menu.pid === cm.pid)
      }
      return _.reverse(bms)
    },

    isEmpytUserMenus: state => () => _.isEmpty(state.menus),

    getMenus: (state) => () => {
      return state.menus
    }
  },
  mutations: {
    setMenus: (state, pyload) => {
      state.menus = pyload
      // 属性结构降低纬度
      const hashMap = CommonUtil.treeToHashTable(pyload || [])
      state.hashMapMenus = hashMap || []
    }
  },
  actions: {

    /**
     *获取已授权菜单信息
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async initAuthMenus ({ commit }) {
      var err = new Error()
      err.name = 'auth-menu-error'
      err.message = '获取授权菜单失败'
      try {
        const res = await AuthUserApi.getAuthUserMenus()
        const { status, data } = res
        if (status === 200 && data.isOk) {
          if (data.data && !_.isEmpty(data.data)) {
            commit('setMenus', data.data)
          } else {
            err.name = 'auth-menu-empty-error'
            err.message = '未分配菜单权限'
            throw err
          }
        } else {
          throw err
        }
      } catch (error) {
        throw err
      }
    },
    /**
     *清除菜单及激活的菜单
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async clearMenus ({ commit }) {
      commit('setMenus', [])
    }
  }
}
