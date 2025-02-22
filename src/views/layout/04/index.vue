<template>
  <div class="layout-container">
    <Layout class="fh">
      <div>
        <Header class="layout-header-bar primary-bg-color">
          <div class="header-bar">
            <div @click="handleGoHome" class="main-title">
              {{ $config.title }}
            </div>
            <div @click="handleGoHome" class="web-logo" style="flex:1"></div>
            <div
              v-if="userInfo && !$_.isEmpty(userInfo)"
              class="custom-content-con"
            >
              <User :userInfo="userInfo"></User>
            </div>
          </div>
        </Header>
      </div>
      <div class=" layout-body">
        <Content class="hc-pd-16 fh ">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </Content>
      </div>
    </Layout>
  </div>
</template>

<script>
import User from '@/views/layout/components/user'
export default {
  components: {
    User
  },
  data() {
    return {}
  },
  computed: {
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    handleGoHome() {
      this.$store.dispatch('goHome')
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
