<!--  -->
<template>
  <div>
    <div style="padding:16px;">
      <Form
        ref="form"
        label-colon
        :model="formDatas"
        :label-width="100"
        :rules="formRules"
      >
        <Row>
          <i-col :xs="24">
            <FormItem label="名称" prop="title">
              <Input v-model="formDatas.title" placeholder="菜单名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="父级菜单" prop="pid">
              <TreeSelect
                v-model="formDatas.pid"
                :data="treeMenuDatas"
                :width="300"
              />
            </FormItem>
          </i-col>
          <i-col :xs="24" :sm="12">
            <FormItem label="是否启用" prop="enabled">
              <i-Switch
                v-model="formDatas.enabled"
                class="ml-16"
                true-color="#13ce66"
                false-color="#ff4949"
                size="large"
              >
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-Switch>
            </FormItem>
          </i-col>

          <i-col :xs="24">
            <FormItem label="前端路由名称" prop="routeName">
              <Input v-model="formDatas.routeName" placeholder="前端路由名称" />
            </FormItem>
          </i-col>

          <i-col :xs="24">
            <FormItem label="path" prop="path">
              <Input v-model="formDatas.path" placeholder="路径" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="query配置" prop="query">
              <Card>
                <JsonEditor
                  :options="{
                    confirmText: '确认',
                    cancelText: '取消'
                  }"
                  :objData="formDatas.query || {}"
                  v-model="formDatas.query"
                >
                </JsonEditor>
              </Card>
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="params配置" :label-width="100" prop="params">
              <Card>
                <JsonEditor
                  :options="{
                    confirmText: '确认',
                    cancelText: '取消'
                  }"
                  :objData="formDatas.params || {}"
                  v-model="formDatas.params"
                >
                </JsonEditor>
              </Card>
            </FormItem>
          </i-col>
          <i-col :xs="24" :sm="24">
            <FormItem label="其他配置" :label-width="100" prop="meta">
              <Card>
                <JsonEditor
                  :options="{
                    confirmText: '确认',
                    cancelText: '取消'
                  }"
                  :objData="formDatas.meta || {}"
                  v-model="formDatas.meta"
                >
                </JsonEditor>
              </Card>
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="图标" prop="iconCls">
              <Input v-model="formDatas.iconCls" placeholder="图标" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="图片地址" prop="iconImage">
              <Input v-model="formDatas.iconImage" placeholder="图片地址" />
            </FormItem>
          </i-col>
          <i-col :xs="24" :sm="12">
            <FormItem label="序号" prop="seq">
              <Input v-model="formDatas.seq" placeholder="序号" />
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import CommonUtil from '@/utils/CommonUtil'
import TreeSelect from '@/views/components/select-tree/menu-tree-slt'
export default {
  name: 'm-form-menu',
  mixins: [FormMixin],
  props: {},
  components: {
    TreeSelect
  },
  created() {
    const _formDatas = Object.assign({}, this.defaultFormValue, this.data)
    this.formDatas = CommonUtil.parseFields(_formDatas, [
      'query',
      'params',
      'meta'
    ])
  },
  data() {
    return {
      parentMenuId: [],
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      treeMenuDatas: [],
      formRules: {
        title: [
          {
            required: true,
            trigger: 'blur',
            message: '名称不能为空'
          }
        ]
      }
    }
  },
  methods: {
    getTreeMenuDatas() {
      this.$http.get('/api-gdss/upms/menu/get/tree/menus').then(res => {
        const { status, data } = res
        if (status === 200 && data.isOk) {
          this.treeMenuDatas = data.data || []
        }
      })
    },
    getDatas() {
      return CommonUtil.stringifyFields(Object.assign({}, this.formDatas), [
        'query',
        'params',
        'meta'
      ])
    }
  },
  mounted: function() {
    this.getTreeMenuDatas()
  },
  computed: {}
}
</script>

<style scoped></style>
