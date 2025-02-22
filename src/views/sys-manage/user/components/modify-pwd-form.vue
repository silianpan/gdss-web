<!--  -->
<template>
  <div style="padding:16px;">
    <Form
      ref="form"
      label-colon
      :model="formDatas"
      :label-width="100"
      :rules="formRules"
    >
      <Row>
        <i-col :xs="24" :sm="24">
          <FormItem label="原密码" prop="oldPwd">
            <Input
              type="password"
              v-model="formDatas.oldPwd"
              placeholder="请输入原密码"
            />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="24">
          <FormItem label="新密码" prop="newPwd">
            <Input
              type="password"
              v-model="formDatas.newPwd"
              placeholder="请输入新密码"
            />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="24">
          <FormItem label="确认新密码" prop="rpNewPwd">
            <Input
              type="password"
              v-model="formDatas.rpNewPwd"
              placeholder="确认新密码"
            />
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
export default {
  name: 'm-form-modify-user',
  mixins: [FormMixin],
  props: {},
  components: {},
  data() {
    return {
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      formRules: {
        oldPwd: [
          {
            required: true,
            trigger: 'blur',
            message: '原密码不能为空'
          }
        ],
        newPwd: [
          {
            required: true,
            trigger: 'blur',
            message: '新密码不能为空'
          }
        ],
        rpNewPwd: [
          {
            required: true,
            trigger: 'blur',
            validator: this.rpNewPwdValidator
          }
        ]
      }
    }
  },
  methods: {
    rpNewPwdValidator: function(rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('请再次输入新密码'))
        return
      }
      // 检查登录账号是否已经存在
      if (value !== this.formDatas.newPwd) {
        callback(new Error('确认的密码不一致'))
      } else {
        callback()
      }
    }
  },
  mounted: function() {},
  computed: {}
}
</script>

<style scoped></style>
