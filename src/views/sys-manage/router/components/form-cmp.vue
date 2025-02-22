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
              <Input v-model="formDatas.title" placeholder="路由名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="父级路由" prop="pid">
              <TreeSelect
                v-model="formDatas.pid"
                :data="treeMenuDatas"
                :width="300"
              />
            </FormItem>
          </i-col>

          <i-col :xs="24">
            <FormItem label="path" prop="path">
              <Input v-model="formDatas.path" placeholder="路径" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="重定向" prop="redirect">
              <Input v-model="formDatas.redirect" placeholder="重定向" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="页面文件" prop="component">
              <Input v-model="formDatas.component" placeholder="页面文件" />
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
// import CommonUtil from '@/utils/CommonUtil'
import TreeSelect from '@/views/components/select-tree/router-tree-slt'
export default {
  name: 'm-form-menu',
  mixins: [FormMixin],
  props: {},
  components: {
    TreeSelect
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
      return Object.assign({}, this.formDatas)
    }
  },
  mounted: function() {
    this.getTreeMenuDatas()
  },
  computed: {}
}
</script>

<style scoped></style>
