<template>
  <div class="item-wrapper">
    <div style="flex: 1 auto;">
      <div class="  hc-pd-16 hc-border content-list-item-content hc-mt-8">
        <div style="display:flex;  align-items: center;justify-items: center;">
          <div v-if="data.productMainPicUrl" class="hc-mr-16" style="width:175px;flex-shrink: 0;position:relative;">
            <Spin v-if="loading" fix large>
              <h-loading></h-loading>
            </Spin>
            <img style="width:100%;height:100%" @load="loadImage" :src="data.productMainPicUrl" />
          </div>
          <div style="flex:1;">
            <div class="item-title-wrapper">
              <div class="item-title hc-show-row-1" @click="handleClick" style="cursor:pointer" v-html="data.productName"></div>
            </div>
            <div class="hc-show-row-3 hc-mt-8 " v-html="data.productIntro"></div>
            <div class="hc-mt-8">
              <Tag color="blue" v-if="data.productCategoryName1"> {{ data.productCategoryName1 || '' }}</Tag>
              <Tag color="blue" v-if="data.productCategoryName2"> {{ data.productCategoryName2 || '' }}</Tag>
              <Tag color="blue" v-if="data.productCategoryName3"> {{ data.productCategoryName3 || '' }}</Tag>
              <Tag v-if="data.addTime"> {{ data.addTime || '' }}</Tag>
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
  computed: {},
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
              <Detail data={this.data}></Detail>
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
