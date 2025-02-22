<template>
  <Form ref="form" :model="formDatas" :rules="formRules">
    <FormItem prop="userName">
      <i-Input v-model.trim="formDatas.userName" placeholder="请输入用户名">
        <Icon type="md-person" slot="prepend"></Icon>
      </i-Input>
    </FormItem>
    <FormItem prop="password">
      <i-Input
        type="password"
        v-model.trim="formDatas.password"
        placeholder="请输入密码"
      >
        <Icon type="md-lock" slot="prepend"></Icon>
      </i-Input>
    </FormItem>
  </Form>
</template>

<script>
import FormMixin from '@/mixins/form'
export default {
  name: 'm-form-login',
  mixins: [FormMixin],
  props: {},
  data() {
    return {
      formDatas: {
        userName: '',
        password: ''
      },
      formRules: {
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  methods: {}
}
</script>
