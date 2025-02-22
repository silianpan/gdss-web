import Config from '@/config'
import api from '@/plugins/axios/api'
class Api {
  /**
   * 获取用户基本信息
   * @author hsc
   * @date 2019-11-25
   * @static
   * @returns
   */
  static async getAuthUserInfo () {
    return api.get(`${this.baseUrlPrefix}/get/auth/info`)
  }

  /**
  * 获取用户授权菜单
  * @author hsc
  * @date 2021-01-04
  * @static
  * @returns
  * @memberof Api
  */
  static async getAuthUserMenus () {
    return api.get(`${this.baseUrlPrefix}/get/menus`)
  }

  /**
   * 获取用户授权路由
   */
  static async getAuthUserRoutes () {
    return api.get(`${this.baseUrlPrefix}/get/auth/routes`)
  }

  /**
   *请求当前用户已授权节点元素
   * @author hsc
   * @date 2020-01-15
   * @static
   * @returns
   * @memberof FrontUserService
   */
  static async getAuthElePer () {
    return api.get(`${this.baseUrlPrefix}/get/elements/per`)
  }
}
Api.baseUrlPrefix = Config.ServerApiPrefix + '/upms/user'
export default Api
