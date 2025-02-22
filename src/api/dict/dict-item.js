import BaseService from '@/api/base-service'
import Config from '@/config'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 字典项 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {DictItemService}
 */
class DictItemService extends BaseService {
  /**
   *
   * 根据groupCode查找字典项
   * @author hsc
   * @date 2020-03-27
   * @param {*} groupCode
   * @returns
   * @memberof DictItemService
   */
  static async queryDictDatasByGroupCode (groupCode) {
    return api.get(`${this.baseUrlPrefix}/find/by/group/code`, {
      code: groupCode
    })
  }

  /**
   *查找字典分组树形数据
   *
   * @author hsc
   * @date 2020-03-26
   * @static
   * @returns
   * @memberof DictGroupService
   */
  static async listDictItemTreeData (qc) {
    return api.post(`${this.baseUrlPrefix}/tree/data`, qc || {})
  }
}

DictItemService.baseUrlPrefix = Config.ServerApiPrefix + '/dict/dictItem'
export default DictItemService
