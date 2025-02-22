<style lang="less">
@import './styles/menu.less';
</style>

<template>
  <div
    :style="{
      width: !shrink ? '245px' : '80px',
      position: 'relative',
      display: 'flex',
      transition: 'width 255ms',
      'flex-direction': 'column',
      'background-color': bgColor
    }"
    class="fh"
  >
    <div class="toggle-arrow-btn" @click="handleToggle">
      <Icon v-if="!shrink" style="position: relative;left: -19px;width: 12px;" type="ios-arrow-back" />
      <Icon v-else style="position: relative;left: -19px;width: 12px;" type="ios-arrow-forward" />
    </div>
    <slot name="top"></slot>
    <div style="flex:1" class="scrollbar-y">
      <sidebar-menu v-if="!shrink" :menu-theme="theme" :active-name="activeName" :menu-list="menuList" :open-names="openNames" @on-change="handleChange"></sidebar-menu>
      <sidebar-menu-shrink v-else :menu-theme="theme" :menu-list="menuList" :icon-color="shrinkIconColor" @on-change="handleChange"></sidebar-menu-shrink>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './components/sidebar-menu.vue'
import SidebarMenuShrink from './components/sidebar-menu-shrink.vue'
import _ from 'lodash'
export default {
  name: 'shrinkable-menu',
  components: {
    SidebarMenu,
    SidebarMenuShrink
  },
  props: {
    activeName: String,
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
      validator(val) {
        return _.includes(['dark', 'light'], val)
      }
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    bgColor() {
      return this.theme === 'dark' ? '#181922' : '#fff'
    },
    shrinkIconColor() {
      return this.theme === 'dark' ? '#fff' : '#181922'
    }
  },
  methods: {
    async handleChange(name) {
      this.$emit('on-change', name)
    },
    handleToggle() {
      this.$emit('update:shrink', !this.shrink)
    }
  }
}
</script>
<style lang="less" scoped>
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
