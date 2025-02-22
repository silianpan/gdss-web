import BaseService from '@/api/base-service'
import Config from '@/config'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'

/**
 *
 * 提供 系统模块 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api extends BaseService {}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/security/sysModule'
export default Api
