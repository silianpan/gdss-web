<template>
  <div class="app-wrap">
    <div
      class="app-item-wrap"
      v-for="(item, index) in menus"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="app-item">
        <div class="app-item-logo-wrap">
          <div class="app-item-logo">
            <img
              class="app-item-logo"
              draggable="false"
              :src="item.iconImage"
              alt=""
            />
          </div>
        </div>
        <div class="app-item-name">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    handleClick(menu) {
      this.$emit('on-click', menu)
    }
  }
}
</script>

<style lang="less" scoped>
.app-wrap {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: auto;
  text-align: center;
}
.app-item-wrap {
  margin-bottom: 14px;
}
.app-item {
  width: 92px;
  height: 92px;
  cursor: pointer;
}
.app-item-logo-wrap {
  height: 49px;
}
.app-item-logo {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  display: inline-block;
  -webkit-box-shadow: 0 4px 16px 0 rgba(38, 38, 38, 0.12);
  box-shadow: 0 4px 16px 0 rgba(38, 38, 38, 0.12);
}

.app-item-name {
  text-decoration: none;
  color: #262626;
  width: 84px;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 4px auto 0;
}
</style>
