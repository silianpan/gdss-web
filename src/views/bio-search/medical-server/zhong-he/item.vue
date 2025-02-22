<template>
  <div class="hc-border item-wrapper hc-pd-16" style="line-height:35px;cusor">
    <div>
      <!-- title -->
      <a @click="handleClick">
        <h2>{{ data.goodsName }}</h2></a
      >
      <h4>{{ data.orgName }}</h4>
    </div>
    <div>
      <!-- pub date -->
      <span class="hc-mr-16" style="color:#bbb">发布时间：</span> <span>{{ data.addTime }}</span>
    </div>
    <div>
      <!-- price -->
      <span class="hc-mr-16" style="color:#bbb">价格：</span><span style="color:red;font-size:20px;">{{ data.goodsPrice }}</span>
    </div>
    <div>
      <!-- 关注数量 -->
      <span class="hc-mr-16" style="color:#bbb">{{ data.followCount || 0 }}人已关注</span>
      <!-- 联系数量 -->
      <span style="color:#bbb">{{ data.bookingCount || 0 }}人已联系</span>
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
  // display: flex;
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
