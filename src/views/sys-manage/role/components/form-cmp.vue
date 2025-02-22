<!--  -->
<template>
  <div>
    <div style="padding:16px;">
      <Alert show-icon>
        <p v-if="formDatas.type === 'sys'">
          <b>系统角色 </b>
        </p>
        <p v-else>
          <b>业务角色 </b>
        </p>
      </Alert>
      <Form ref="form" label-colon :model="formDatas" :label-width="80" :rules="formRules">
        <Row>
          <i-col :xs="24">
            <FormItem label="名称" prop="name">
              <Input v-model="formDatas.name" placeholder="角色名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="编码" prop="code">
              <Input v-model="formDatas.code" placeholder="角色编码" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="类型" prop="type">
              <RoleTypeSltCmp v-model="formDatas.type" placeholder="角色类型" />
            </FormItem>
          </i-col>
          <i-col :xs="24" :sm="12">
            <FormItem label="是否启用" prop="enabled">
              <i-Switch v-model="formDatas.enabled" class="hc-ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-Switch>
            </FormItem>
          </i-col>
          <i-col :xs="24" :sm="24">
            <FormItem label="描述" prop="remark">
              <Input :rows="5" v-model="formDatas.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="描述..." />
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import RoleTypeSltCmp from '@/views/components/select-cmp/sys-role-type-slt.vue'
export default {
  name: 'm-form-role-type',
  mixins: [FormMixin],
  props: {},
  components: {
    RoleTypeSltCmp
  },
  data() {
    return {
      defaultFormValue: {
        enabled: true,
        type: 'sys'
      },
      copyRole: {},
      formDatas: {},
      formRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '角色名称不能为空'
          }
        ],
        code: [
          {
            type: 'string',
            required: true,
            message: '角色编码不能为空'
          }
        ],
        type: [
          {
            type: 'string',
            required: true,
            message: '角色类型不能为空'
          }
        ]
      }
    }
  },
  methods: {
    getDatas() {
      return {
        role: Object.assign({}, this.formDatas),
        copyRole: (this.copyRole || {}).id
      }
    }
  },
  mounted: function() {},
  computed: {}
}
</script>

<style scoped></style>
