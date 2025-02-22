<style lang="less">
@import './login.less';

.login-title-border {
  font-size: 35px;
  color: white;
  font-weight: bold;
  border-top: 2px solid white;
  border-radius: 5px 20% 50%;
}
</style>

<template>
  <div class="login-container">
    <div class="login">
      <div class="login-content">
        <div class="login-title">
          <div>文档检索</div>
          <div class="login-title-border">服务平台</div>
        </div>
        <div class="login-con">
          <Spin v-if="loading" fix large></Spin>
          <Card>
            <login-form ref="loginForm"></login-form>
            <Button :loading="loading" @click="handleSubmit" type="primary" long
              >登录</Button
            >
          </Card>
        </div>
      </div>
    </div>
    <div class="body-footer ivu-layout-footer">
      <!-- <span
        >2019-2021 © 成都青云石智能科技有限公司 &
        四川卓信力加信息科技有限责任公司</span
      > -->
    </div>
  </div>
</template>

<script>
import LoginForm from './components/login-form'
import Api from '@/api/auth/login'
export default {
  components: {
    LoginForm
  },
  data: function() {
    /** 登陆验证规则 */
    return {
      rememberPwd: true,
      loading: false
    }
  },
  computed: {},
  methods: {
    handleSubmit() {
      // 发起登陆请求 ，获取返回数据 初始化 vuex 进入home 页面
      this.loading = true
      this.$refs.loginForm.validate().then(async formDatas => {
        if (formDatas) {
          const { userName, password } = formDatas
          Api.login({
            username: userName,
            password: password
          })
            .then(rs => {
              const { status } = rs
              console.log(status)
              if (status === 200) {
                // 查询用户信息
                // 查询用户菜单信息
                Promise.all([
                  this.$store.dispatch('initAuthInfo'),
                  this.$store.dispatch('initAuthMenus'),
                  this.$store.dispatch('initAuthUserRoutes')
                ])
                  .then(() => {
                    this.$Message.success('账号验证成功')
                    this.$store
                      .dispatch('goHome')
                      .then(() => {
                        this.loading = false
                      })
                      .catch(e => {
                        this.loading = false
                      })
                  })
                  .catch(err => {
                    const { message, name } = err
                    this.loading = false
                    this.$Message.error(message)
                    if (name === 'auth-err') {
                    } else if (name === 'auth-route-error') {
                      // 路由错误
                    } else if (name === 'auth-menu-error') {
                      // 菜单错误
                    }
                  })
              } else {
                if (status === 500) {
                  this.$router.push('/errorPage/500/服务正在维护中')
                } else {
                  this.$Message.error(rs.data.msg)
                }
                this.loading = false
              }
            })
            .catch(e => {
              this.loading = false
            })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
