<!--  -->
<template>
  <div style="padding:16px;">
    <div style="display: flex; width: 100%;">
      <div style="flex: 1 1 auto;">
        <Form
          ref="form"
          label-colon
          :model="formDatas"
          :label-width="80"
          :rules="formRules"
        >
          <Row>
            <i-col :xs="24" :sm="24">
              <FormItem label="账号名" prop="userName">
                <Input v-model="formDatas.userName" placeholder="账号名" />
              </FormItem>
            </i-col>
            <i-col :xs="24" :sm="24">
              <FormItem label="昵称" prop="nickName">
                <Input v-model="formDatas.nickName" placeholder="昵称" />
              </FormItem>
            </i-col>
            <i-col :xs="24" :sm="24">
              <FormItem label="角色">
                <Select v-model="userRoles" multiple placeholder="角色">
                  <OptionGroup label="系统角色">
                    <Option
                      v-for="item in rolesData.filter(r => r.type === 'sys') ||
                        []"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.name }}</Option
                    >
                  </OptionGroup>
                  <OptionGroup label="业务角色">
                    <Option
                      v-for="item in rolesData.filter(r => r.type === 'bus') ||
                        []"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.name }}</Option
                    >
                  </OptionGroup>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :sm="24">
              <FormItem label="所在部门">
                <SysDeptSlt v-model="formDatas.deptId"></SysDeptSlt>
              </FormItem>
            </i-col>
            <i-col :xs="24" :sm="24">
              <FormItem label="电话号码" prop="phonenumber">
                <Input v-model="formDatas.phonenumber" placeholder="电话号码" />
              </FormItem>
            </i-col>
            <i-col :xs="24" :sm="24">
              <FormItem label="邮箱" prop="email">
                <Input v-model="formDatas.email" placeholder="邮箱" />
              </FormItem>
            </i-col>
            <i-col :xs="24">
              <FormItem label="是否启用" prop="enabled">
                <i-Switch
                  v-model="formDatas.enabled"
                  class="hc-ml-16"
                  true-color="#13ce66"
                  false-color="#ff4949"
                  size="large"
                >
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-Switch>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
      <div
        style="width: 242px; margin-left: 10px; text-align: right; flex: 0 1 auto;"
      >
        <div
          style="width: 150px;height:200px; margin-top: 0px;border:4px solid #fff;"
        >
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
            style="width: 100%;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import RegexUtil from '@/utils/RegexUtil'
import SysDeptSlt from '@/views/components/select-cmp/sys-dept-slt'
export default {
  name: 'm-form-user',
  mixins: [FormMixin],
  props: {},
  components: {
    SysDeptSlt
  },
  data() {
    return {
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      userRoles: [],
      rolesData: [
        {
          name: '超级管理员',
          id: '1',
          type: 'sys'
        },
        {
          name: '普通用户',
          id: '2',
          type: 'bus'
        }
      ],
      formRules: {
        userName: [
          {
            required: true,
            trigger: 'blur',
            message: '账号不能为空'
          }
        ],
        email: [
          {
            type: 'string',
            message: '不是有效的邮件地址',
            pattern: RegexUtil.regexs.Email
          }
        ],
        phonenumber: [
          {
            type: 'string',
            message: '不是有效的手机号码',
            pattern: RegexUtil.regexs.Phone
          }
        ]
      }
    }
  },
  methods: {
    //
    queryRoles() {
      this.$http.get('/api-gdss/upms/role/all').then(res => {
        const { status, data } = res
        if (status === 200 && data.isOk) {
          this.rolesData = data.data || []
        } else {
          this.rolesData = []
        }
      })
    },
    // 查询用户所拥有的角色权限
    queryUserRoles() {
      if (this.formDatas.id) {
        this.$http
          .get('/api-gdss/upms/reUserRole/list/by/userid', {
            userId: this.formDatas.id
          })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.userRoles = data.data || []
              console.log(this.userRoles)
            } else {
              this.userRoles = []
            }
          })
      }
    },
    getDatas() {
      const datas = Object.assign({}, this.formDatas)
      return {
        user: datas,
        roles: this.userRoles || []
      }
    },
    async init() {
      await this.queryRoles()
      await this.queryUserRoles()
    }
  },
  mounted: function() {
    this.init()
  },
  computed: {}
}
</script>

<style scoped></style>
