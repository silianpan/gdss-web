<!--  -->
<template>
  <div>
    <div style="padding:16px;">
      <Form ref="form" label-colon :model="formDatas" :label-width="80" :rules="formRules">
        <Row>
          <i-col :xs="24">
            <FormItem label="部门名称" prop="deptName">
              <Input v-model="formDatas.deptName" placeholder="部门名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="部长" prop="leader">
              <SysUserSltCmp filterable v-model="formDatas.leader" placeholder="请选择部长"></SysUserSltCmp>
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="联系电话" prop="phone">
              <Input v-model="formDatas.phone" placeholder="联系电话" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="邮箱" prop="email">
              <Input v-model="formDatas.email" placeholder="邮箱" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="是否启用" prop="enabled">
              <i-Switch v-model="formDatas.enabled" class="hc-ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-Switch>
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="排序" prop="sort">
              <Input v-model="formDatas.sort" placeholder="排序" />
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import SysUserSltCmp from '@/views/components/select-cmp/sys-user-slt.vue'
export default {
  name: 'm-form-dept',
  mixins: [FormMixin],
  props: {},
  components: {
    SysUserSltCmp
    // RoleTypeSltCmp
  },
  data() {
    return {
      defaultFormValue: {
        enabled: true
      },
      copyRole: {},
      formDatas: {},
      formRules: {
        deptNme: [
          {
            required: true,
            trigger: 'blur',
            message: '部门名称不能为空'
          }
        ]
      }
    }
  },
  methods: {
    getDatas() {
      return Object.assign({}, this.formDatas)
    }
  },
  mounted: function() {},
  computed: {}
}
</script>

<style scoped></style>
