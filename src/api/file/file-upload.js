import Config from '@/config'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {Api}
 */
class Api {
  /**
   *
   * 删除文件|文件夹
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @param {*} enabled
   * @returns
   * @memberof Api
   */
  static async delete (params) {
    return api.post(`${this.baseUrlPrefix}/delete`, params)
  }

  /**
   *下载文件
   *
   * @author hsc
   * @date 2019-12-17
   * @static
   * @param {*} fileName
   * @param {*} relativePath
   * @returns
   * @memberof Api
   */
  static async download (fileName, relativePath) {
    return api.downLoadFile(
      `${this.baseUrlPrefix}/download`,
      {
        params: {
          name: fileName,
          path: relativePath
        },
        method: 'get'
      },
      fileName
    )
  }

  static async downloadZip (params, fileName) {
    return api.downLoadFile(
      `${this.baseUrlPrefix}/download/zip`,
      {
        data: params
      },
      `${fileName || 'default'}.zip`
    )
  }
}

Api.baseUrlPrefix = Config.ServerApiPrefix + '/file/upload'

Api.uploadTempFileUrl = Api.baseUrlPrefix + '/temp'

Api.uploadFormalUrl = Api.baseUrlPrefix + '/formal'

export default Api
