import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 资源类型 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api extends BaseService {
  static async listAggAuthByRole({ roleId, moduleId, resourceType }) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(
        `${this.baseUrlPrefix}/list/auth/${roleId}/${moduleId}/${resourceType}`
      )
    }
  }

  static async authAggToRole(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/auth/agg/to/role`, params)
    }
  }
}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/security/sysResourceAgg'
export default Api
