<template>
  <div class="layout-container">
    <Layout :style="{ height: '100vh' }">
      <Header :style="{ padding: 0 }" class="layout-header-bar primary-bg-color">
        <div class="header-bar">
          <div class="main-title " @click="handleGoHome">
            {{ $config.title }}
          </div>
          <div class="custom-content-con">
            <User :userInfo="userInfo"></User>
          </div>
        </div>
      </Header>
      <Layout style="position:relative;height:calc(100vh - 70px)">
        <Sider
          :width="256"
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="80"
          class="i-scrollbar-hide"
          v-model="isCollapsed"
          :style="{ background: '#fff', 'overflow-y': 'auto', height: '100%' }"
        >
          <shrinkable-menu :active-name="siderBarActiveMenuName" :open-names="openNames" @on-change="handleMenuClick" :menu-list="menusList"></shrinkable-menu>
        </Sider>
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
import ShrinkableMenu from '@/views/layout/components/shrinkable-menu/shrinkable-menu'
import User from '@/views/layout/components/user'
export default {
  components: {
    ShrinkableMenu,
    User
  },
  data() {
    return {
      isCollapsed: false,
      siderBarActiveMenuName: ''
    }
  },
  mounted() {
    this.siderBarActiveMenuName = this.$router.currentRoute.name
  },
  watch: {
    $route(newRoute) {
      this.siderBarActiveMenuName = newRoute.name
      console.log('newRoute', newRoute)
    }
  },
  computed: {
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    },
    openNames() {
      return this.getOpenNamesFromTree(this.menusList, el => (el.routeName || el.id) === this.siderBarActiveMenuName)
    },
    // sider 菜单
    menusList() {
      return this.$store.getters.getMenus()
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
          target.push(element.routeName || element.id)
          break
        }
        if (!this.$_.isEmpty(element.children)) {
          target.push(element.routeName || element.id)
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
      const targetMenu = this.getTargeFromTree(this.menusList, e => {
        return e.routeName === menuName || e.id === menuName
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
</style>
