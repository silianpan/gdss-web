<template>
  <div class="item-wrapper">
    <div style="flex: 1 auto;">
      <div class="item-title-wrapper">
        <!-- <div class="item-classify hc-mr-16">{{ data.classify_name }}</div> -->
        <div
          class="item-title hc-show-row-1"
          @click="handleClick"
          style="cursor:pointer"
          v-html="data.title"
        ></div>
      </div>
      <div class="  hc-pd-16 hc-border content-list-item-content hc-mt-8">
        <div style="display:flex;  align-items: center;justify-items: center;">
          <div
            v-if="others.img"
            class="hc-mr-16"
            style="width:100px;height:100px;flex-shrink: 0;position:relative;"
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
          <div style="flex:1">
            <div><b>介绍：</b></div>
            <div class="hc-show-row-3 hc-mt-8 " v-html="data.content"></div>
            <div class="hc-mt-8">
              <Tag v-if="others.pub_date">{{ others.pub_date }}</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from './detail'
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
    },
    handleClick() {
      const drawer = this.$ddr.create(
        {
          width: '60%',
          components: {},
          render: (
            <div style="background-color:#f5f7f9">
              <Detail url={this.data.json_url}></Detail>
            </div>
          )
        },
        this
      )
      drawer.show()
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrapper {
  margin-bottom: 8px;
  display: flex;
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
