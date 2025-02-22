<template>
  <div class="layout-container">
    <Layout class="fh bg-white">
      <Header
        :style="{
          padding: 0,
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0
        }"
        class="layout-header-bar primary-bg-color fixed"
      >
        <div class="header-bar">
          <div @click="handleGoHome" class="main-title">
            {{ $config.title }}
          </div>
          <div class="custom-content-con">
            <User :userInfo="userInfo"></User>
          </div>
        </div>
      </Header>
      <Content style="margin-top:86px;" class="hc-ml-16 hc-mr-16 hc-mb-16 fh ">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </Content>
    </Layout>
    <HomeFastMenus
      labelField="title"
      iconField="iconCls"
      :fab-btns="fabBtns"
      @on-click="handleClick"
    ></HomeFastMenus>
  </div>
</template>

<script>
import User from '@/views/layout/components/user'
import HomeFastMenus from './fast-menus'
export default {
  components: {
    User,
    HomeFastMenus
  },
  data() {
    return {}
  },
  computed: {
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    },
    parentMenu() {
      return this.$store.getters.getParentMenu || {}
    },
    brotherMenus() {
      return this.$store.getters.getBrotherMenus || []
    },
    fabBtns() {
      let fabBtns = []
      if (!this.$_.isEmpty(this.parentMenu)) {
        fabBtns.push(
          Object.assign({}, this.$store.getters.getUpMenu, {
            title: '返回上一级',
            btnType: 'default',
            iconCls: ' iconfont icon-ai207'
          })
        )
      }
      if (!this.$_.isEmpty(this.brotherMenus) && this.brotherMenus.length > 1) {
        fabBtns = fabBtns.concat(this.brotherMenus)
      }
      return fabBtns
    }
  },
  methods: {
    handleGoHome() {
      this.$store.dispatch('goHome')
    },
    handleClick(item) {
      if (item.children && item.children.length > 0) {
        this.$store.dispatch('goTargetRoute', item.children[0])
      } else {
        this.$store.dispatch('goTargetRoute', item)
      }
      // 跳转到目标页面
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
</style>
