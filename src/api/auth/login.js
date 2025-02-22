import Config from '@/config'
import api from '@/plugins/axios/api'
class Api {
  /**
   *
   * @author hsc
   * @date 2019-11-29
   * @static
   * @param {*} params
   * username : 账户名
   * password :密码
   * @returns
   * @memberof Api
   */
  static async login (params) {
    return api.post(`${this.baseUrlPrefix}/login`, params)
  }

  /**
   * 退出登录
   * @author hsc
   * @date 2019-11-29
   * @static
   * @returns
   * @memberof Api
   */
  static async logout () {
    return api.get(`${this.baseUrlPrefix}/logout`)
  }
}
Api.baseUrlPrefix = Config.ServerApiPrefix
export default Api
