<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="display:flex;justify-content:center;" :key="index">
        <Dropdown :theme="menuTheme" v-if="hasChildren(item)" placement="right-start" :key="index" @on-click="changeMenu">
          <div class="hc-pd-8" style="width:100%">
            <a href="javascript:void(0)">
              <custom-icon :color="iconColor" :type="item.iconCls || ''" :size="iconSize" />
            </a>
          </div>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="getName(child)" :key="i">
                <custom-icon :color="iconColor" :type="child.iconCls || ''" :size="iconSize" />
                <span style="padding-left:10px;">{{ showTitle(child) }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown :theme="menuTheme" v-else placement="right-start" :key="index" @on-click="changeMenu">
          <div class="hc-pd-8">
            <a href="javascript:void(0)">
              <custom-icon :color="iconColor" :type="item.iconCls || ''" :size="iconSize" />
            </a>
          </div>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="getName(item)" :key="'d' + index">
              <custom-icon :color="iconColor" :type="item.iconCls || ''" :size="iconSize" />
              <span style="padding-left:10px;">{{ showTitle(item) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  mixins: [mixin],
  name: 'sidebar-menu-shrink',
  props: {
    menuList: {
      type: Array
    },
    iconSize: {
      type: Number,
      default: () => {
        return 16
      }
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    menuTheme: {
      type: String,
      default: 'dark'
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active)
    },
    itemTitle(item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    }
  }
}
</script>
