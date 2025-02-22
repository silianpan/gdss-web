<template>
  <div class="item-wrapper">
    <div class="item-title-wrapper">
      <div class="item-classify hc-mr-16">{{ data.classify_name }}</div>
      <div>
        <a :href="data.url" target="_blank">
          <div
            class="item-title hc-show-row-1"
            style="cursor:pointer"
            v-html="data.title"
          ></div>
        </a>
      </div>
    </div>
    <div class="  content-list-item-content hc-mt-8">
      <a :href="data.url" target="_blank">
        <div
          v-if="others.img"
          class="hc-mr-16 hc-border"
          style="width:172px;height:220px;flex-shrink: 0;position:relative;"
        >
          <Spin v-if="loading" fix large>
            <h-loading></h-loading>
          </Spin>
          <img
            style="width:100%;height:100%"
            @load="loadImage"
            :src="others.img"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  components: {},
  data() {
    return {
      loading: true
    }
  },
  computed: {
    others() {
      const { others } = this.data
      if (others && !this.$_.isEmpty(others)) {
        try {
          return JSON.parse(others)
        } catch (error) {}
      }
      return {}
    }
  },
  mounted() {},
  methods: {
    loadImage() {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrapper {
  margin-bottom: 8px;
}
.item-title-wrapper {
  display: flex;
}
.item-title {
  font-size: 18px;
  color: #0042a2 !important;
  position: relative;
  flex: 1 auto;
}
.item-classify {
  background-color: #0042a2;
  padding: 4px 16px;
  font-size: 16px;
  flex-shrink: 0;
  color: #ffff !important;
}
</style>
