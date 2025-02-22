import Config from '@/config'
import _ from 'lodash'
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
  static async query(qc) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/query`, qc)
    }
  }
}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/elasticsearch'
export default Api
