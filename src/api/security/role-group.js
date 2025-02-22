import BaseService from '@/api/base-service'
import Config from '@/config'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'
/**
 *
 * 提供 角色组操作 接口
 * @author hsc
 * @date 2019-11-25
 * @class ModuleService
 * @extends {RoleGroupService}
 */
class RoleGroupService extends BaseService {}

RoleGroupService.baseUrlPrefix =
  Config.ServerApiPrefix + '/security/sysRoleGroup'
export default RoleGroupService
