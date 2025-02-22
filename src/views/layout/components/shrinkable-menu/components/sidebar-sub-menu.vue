<template>
  <Submenu :name="getName(parentItem)">
    <template slot="title">
      <custom-icon :type="parentItem.iconCls || ''" :size="iconSize" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <sidebar-sub-menu
        v-if="hasChildren(item)"
        :key="`menu-${item.id}`"
        :parent-item="item"
      ></sidebar-sub-menu>
      <menu-item v-else :name="getName(item)" :key="`menu-${item.id}`">
        <custom-icon :type="item.iconCls || ''" :size="14" />
        <span>{{ showTitle(item) }}</span>
      </menu-item>
    </template>
  </Submenu>
</template>

<script>
import mixin from '../mixin'
import itemMixin from '../item-mixin'
export default {
  mixins: [mixin, itemMixin],
  name: 'sidebar-sub-menu'
}
</script>
