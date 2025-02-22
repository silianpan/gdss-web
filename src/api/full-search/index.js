import Config from '@/config'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 全文搜索接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api {
  /**
   *索引刷新
   *
   * @author hsc
   * @date 2020-07-29
   * @static
   * @returns
   * @memberof Api
   */
  static async refresh () {
    return api.get(`${this.baseUrlPrefix}/refresh`)
  }
}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/fullsearch/index'
export default Api
