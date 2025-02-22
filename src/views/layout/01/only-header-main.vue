<template>
  <div class="layout-container">
    <Layout :style="{ height: '100vh' }">
      <Header :style="{ padding: 0 }" class="layout-header-bar primary-bg-color">
        <div class="header-bar">
          <div class="main-title" @click="handleGoHome"></div>
          <div class="custom-content-con">
            <User :userInfo="userInfo"></User>
          </div>
        </div>
      </Header>
      <Layout style="position:relative;height:calc(100vh - 70px)">
        <Content>
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </Content>
      </Layout>
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
    return {
      isCollapsed: false
    }
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
