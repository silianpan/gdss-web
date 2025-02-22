import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 角色操作 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {RoleService}
 */
class RoleService extends BaseService {
  static async saveForm(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/saveForm`, params)
    }
  }

  /**
   *
   *更改角色状态
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @param {*} enabled
   * @returns
   * @memberof RoleService
   */
  static async changeEnable(id, enable) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/change/enable`, {
        id: id,
        enable: enable || false
      })
    }
  }

  /**
   *
   * 给角色赋予某个菜单的权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async signUserToRole(userId, roleId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/sign/user/to/role`, {
        userId,
        roleId
      })
    }
  }

  /**
   *
   * 取消某个用户的角色权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async unSignUserToRole(userId, roleId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/unsign/user/to/role`, {
        userId,
        roleId
      })
    }
  }
}

RoleService.baseUrlPrefix = Config.ServerApiPrefix + '/security/sysRole'
export default RoleService
