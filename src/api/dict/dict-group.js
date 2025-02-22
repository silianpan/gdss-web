import BaseService from '@/api/base-service'
import Config from '@/config'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 字典项 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {DictGroupService}
 */
class DictGroupService extends BaseService {
  /**
   *查找字典分组树形数据
   *
   * @author hsc
   * @date 2020-03-26
   * @static
   * @returns
   * @memberof DictGroupService
   */
  static async listDictGroupTreeData () {
    return api.post(`${this.baseUrlPrefix}/tree/data`, {})
  }
}

DictGroupService.baseUrlPrefix = Config.ServerApiPrefix + '/dict/dictGroup'
export default DictGroupService
