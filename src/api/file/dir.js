import BaseService from '@/api/base-service'
import Config from '@/config'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件夹操作 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {DirService}
 */
class DirService extends BaseService {
  /**
   *
   * 根据path查找文件夹信息
   * @author hsc
   * @date 2020-07-24
   * @static
   * @param {*} path
   * @returns
   * @memberof DirService
   */
  static async findDirByPath (path) {
    return api.get(`${this.baseUrlPrefix}/find/dir/by/path`, {
      path
    })
  }

  /**
   * 根据文件夹分页查询数据
   * @author hsc
   * @date 2019-12-18
   * @static
   * @param {*} path
   * @returns
   * @memberof FileService
   */
  static async pageDirChildren (dirId, query) {
    return api.post(`${this.baseUrlPrefix}/page/dir/children/${dirId}`, query)
  }

  /**
   * 根据pid查找目录
   * @author hsc
   * @date 2020-01-03
   * @memberof FileService
   */
  static async findDirByPid (pid) {
    return api.get(`${this.baseUrlPrefix}/find/dir/by/${pid}`)
  }

  /**
   * 根据pid查找上级目录的兄弟目录
   * @author hsc
   * @date 2020-01-03
   * @memberof FileService
   */
  static async findParentBrotherDirByPId (pid) {
    return api.get(`${this.baseUrlPrefix}/find/parent/brother/dir/by/${pid}`)
  }
}

DirService.baseUrlPrefix = Config.ServerApiPrefix + '/file/dir'
export default DirService
