<style lang="less">
@import '../styles/menu.less';
</style>
<template>
  <Menu ref="sideMenu" :active-name="activeName" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
    <template v-for="item in menuList">
      <sidebar-sub-menu :icon-size="iconSize" v-if="hasChildren(item)" :key="`menu-${item.id}`" :parent-item="item"></sidebar-sub-menu>
      <menu-item v-else :name="getName(item)" :key="`menu-${item.id}`">
        <custom-icon :type="item.iconCls || ''" :size="iconSize" />
        <span>{{ showTitle(item) }}</span>
      </menu-item>
    </template>
  </Menu>
</template>

<script>
import SidebarSubMenu from './sidebar-sub-menu'
import mixin from '../mixin'
export default {
  mixins: [mixin],
  name: 'sidebar-menu',
  components: {
    SidebarSubMenu
  },
  props: {
    menuList: Array,
    activeName: String,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: 'light'
    },
    openNames: {
      type: Array
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active)
    }
  },
  updated() {
    console.log('active_name', this.activeName)
    console.log('openNames', this.openNames)
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
  }
}
</script>
