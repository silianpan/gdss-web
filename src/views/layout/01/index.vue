<template>
  <div class="layout-container">
    <Layout class="fh">
      <div>
        <Header class="layout-header-bar primary-bg-color">
          <div class="header-bar">
            <div class="main-title " @click="handleGoHome">
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
          <shrinkable-menu
            style="flex-shrink:0;"
            :shrink.sync="shrink"
            :active-name="siderBarActiveMenuName"
            :open-names="openNames"
            @on-change="handleMenuClick"
            :menu-list="menuList"
          ></shrinkable-menu>
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
import ShrinkableMenu from '@/views/layout/components/shrinkable-menu/shrinkable-menu'
export default {
  components: {
    User,
    ShrinkableMenu
  },
  data() {
    return {
      shrink: false,
      siderBarActiveMenuName: ''
    }
  },
  mounted() {
    const targetMenu = this.getTargeFromTree(this.menuList, e => {
      return (
        e.routeName === this.$router.currentRoute.name ||
        e.path === this.$router.currentRoute.path ||
        e.id === this.$router.currentRoute.name
      )
    })
    this.siderBarActiveMenuName =
      targetMenu.routeName || targetMenu.path || targetMenu.id
  },
  watch: {
    $route(newRoute) {
      const targetMenu = this.getTargeFromTree(this.menuList, e => {
        return (
          e.routeName === newRoute.name ||
          e.path === newRoute.path ||
          e.id === newRoute.name
        )
      })
      this.siderBarActiveMenuName =
        targetMenu.routeName || targetMenu.path || targetMenu.id
    }
  },
  computed: {
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    },
    menuList() {
      return this.$store.getters.getMenus()
    },
    openNames() {
      return this.getOpenNamesFromTree(
        this.menuList,
        el => (el.routeName || el.path || el.id) === this.siderBarActiveMenuName
      )
    }
  },
  methods: {
    getOpenNamesFromTree(tree, judge) {
      if (this.$_.isEmpty(tree)) {
        return []
      }
      let target = []
      for (let i = 0; i < tree.length; i++) {
        const element = tree[i]
        if (judge(element)) {
          target.push(element.routeName || element.path || element.id)
          break
        }
        if (!this.$_.isEmpty(element.children)) {
          target.push(element.routeName || element.path || element.id)
          const cr = this.getOpenNamesFromTree(element.children, judge)
          if (!this.$_.isEmpty(cr)) {
            target = target.concat(cr)
            break
          } else {
            target.pop()
          }
        }
      }
      return target
    },
    getTargeFromTree(tree, judge) {
      if (this.$_.isEmpty(tree)) {
        return null
      }
      let target = null
      for (let i = 0; i < tree.length; i++) {
        const element = tree[i]
        if (judge(element)) {
          target = element
          break
        }
        if (!this.$_.isEmpty(element.children)) {
          const cr = this.getTargeFromTree(element.children, judge)
          if (cr) {
            target = cr
            break
          }
        }
      }
      return target
    },
    handleMenuClick(menuName) {
      // 从菜单树中获取到当前菜单信息
      const targetMenu = this.getTargeFromTree(this.menuList, e => {
        return (
          e.routeName === menuName || e.path === menuName || e.id === menuName
        )
      })
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
