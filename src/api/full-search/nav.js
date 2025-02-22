import Config from '@/config'
import BaseService from '@/api/base-service'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'
/**
 *
 * 提供 全文搜索导航接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api extends BaseService {}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/fullsearch/nav'
export default Api
