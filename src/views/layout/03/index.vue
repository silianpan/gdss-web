<template>
  <div class="layout-container">
    <Layout class="fh ">
      <div>
        <Header class="layout-header-bar primary-bg-color">
          <div class="header-bar">
            <div @click="handleGoHome" class="main-title">
              {{ $config.title }}
            </div>
            <div @click="handleGoHome" class="web-logo" style=";flex:1"></div>
            <div class="custom-content-con">
              <User :userInfo="userInfo"></User>
            </div>
          </div>
        </Header>
      </div>
      <div class="layout-body">
        <div style="display:flex;" class="fh">
          <div
            :style="{
              width: toggle ? '314px' : '122px',
              'flex-shrink': 0,
              position: 'relative',
              transition: 'width 255ms'
            }"
            class="hc-border hc-pd-16 fh bg-white"
          >
            <div class="toggle-arrow-btn" @click="handleToggle">
              <Icon
                v-if="toggle"
                style="position: relative;left: -19px;width: 12px;"
                type="ios-arrow-back"
              />
              <Icon
                v-else
                style="position: relative;left: -19px;width: 12px;"
                type="ios-arrow-forward"
              />
            </div>
            <SimpleMenu
              style="flex:1"
              :menus="menuList"
              @on-click="handleClick"
            ></SimpleMenu>
          </div>
          <div style="flex:auto">
            <Content class="hc-pd-16 fh ">
              <transition name="fade-transform" mode="out-in">
                <router-view />
              </transition>
            </Content>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import User from '@/views/layout/components/user'
import SimpleMenu from '../components/simple-menu'
export default {
  components: {
    User,
    SimpleMenu
  },
  data() {
    return {
      toggle: true
    }
  },
  computed: {
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    },
    menuList() {
      return this.$store.getters.getMenus()
    }
  },
  methods: {
    handleToggle() {
      this.toggle = !this.toggle
    },
    handleClick(targetMenu) {
      this.$store.dispatch('goTargetRoute', targetMenu)
    },
    handleGoHome() {
      this.$store.dispatch('goHome')
    }
  }
}
</script>

<style lang="less" scoped>
@import './main.less';
.toggle-arrow-btn {
  cursor: pointer;
  border-style: solid;
  border-radius: 0;
  display: inline-block;
  box-shadow: none;
  text-decoration: none;
  text-align: center;
  text-transform: none;
  white-space: nowrap;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  padding: 0;
  border-width: 9px 0 9px 20px;
  width: 0;
  border-color: transparent transparent transparent #ebebeb;
  background: none;
  height: 64px;
  line-height: 46px;
  color: #c1c1c1;
}
</style>
