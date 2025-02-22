<template>
  <div>
    <!-- <div class="bg-white">
     
    </div> -->
    <!-- 内容 -->
    <div v-if="detailInfo.goodsImages && !$_.isEmpty(detailInfo.goodsImages)" style="width:100%;position:relative;">
      <Carousel autoplay :height="150">
        <CarouselItem v-for="(gI, index) in detailInfo.goodsImages" :key="index">
          <img style="width:100%;height:100%" :src="gI" />
        </CarouselItem>
      </Carousel>
    </div>
    <div class="bg-white" style="display:flex;  align-items: center;justify-items: center;padding-bottom:16px;">
      <div>
        <h1>{{ detailInfo.goodsName }}</h1>
        <div style="color:#8e9499;line-height:35px;">
          <div>
            <span class="hc-mr-16">价格</span><b style="font-size: 26px; font-weight: bold; color: rgb(254, 136, 36);">{{ detailInfo.goodsPrice || '面议' }}</b>
          </div>
          <div>
            <span class="hc-mr-16">发布时间</span> <span>{{ detailInfo.addTime || '' }}</span>
          </div>
          <div>
            <span class="hc-mr-16">所属单位</span> <span>{{ detailInfo.orgName || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 服务详情 -->
      <div class="hc-pd-8">
        <h2>技术服务简介</h2>
      </div>
      <div class="hc-pd-8 bg-white">
        <span v-html="detailInfo.goodsIntro"></span>
      </div>
      <div class="hc-pd-8">
        <h2>其他说明</h2>
      </div>
      <div class="hc-pd-8 bg-white">
        <span v-html="detailInfo.goodsOtherDesc"></span>
      </div>
      <!-- 联系电话 -->
    </div>
    <div>
      <div class="hc-pd-8">
        <h2>联系信息</h2>
      </div>
      <div class="hc-pd-8 bg-white">
        <div style="color:#8e9499">
          <div class="hc-pd-8">
            <custom-icon type="iconfont icon-gongsi"></custom-icon>
            {{ detailInfo.contractPerson || '暂无联系地址' }}
          </div>
          <div class="hc-pd-8"><Icon type="ios-phone-portrait" /> {{ detailInfo.contractMobile || '暂无联系电话' }}</div>
        </div>
      </div>
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
      detailInfo: {},
      loading: false
    }
  },
  computed: {},
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const { goodsId } = this.data
      this.loading = true
      this.$http
        .post(
          '/bioisp-api/mall/third-party-service/detail',
          {
            goodsId
          },
          {
            headers: {
              appid: '1e7f96fa-907d-4216-97b2-396f987382b7'
            }
          }
        )
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            this.detailInfo = rb.data.content || {}
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less">
.hyzx-wrapper {
  padding: 0 16px;
  .title {
    font-size: 20px;
    color: #333;
    width: 100%;
    text-align: left;
  }
  .content {
    padding: 8px 16px;
  }
  .hbg {
    background-color: #ebf0fa;
  }
  .textbox {
    color: #666666;
    font-size: 16px;
    line-height: 175%;
    margin-top: 20px;
  }
}
</style>
