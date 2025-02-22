import BaseService from '@/api/base-service'
import Config from '@/config'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'
/**
 *
 * 提供 资源类型 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api extends BaseService {}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/security/sysResourceType'
export default Api
