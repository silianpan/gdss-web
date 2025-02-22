<template>
  <div>
    <!-- 内容 -->
    <div class="bg-white" style="display:flex;  align-items: center;justify-items: center;padding-bottom:16px;">
      <div v-if="data.productMainPicUrl" class="hc-mr-16" style="width:235px;flex-shrink: 0;position:relative;">
        <Spin v-if="loading" fix large>
          <h-loading></h-loading>
        </Spin>
        <img style="width:100%;height:100%" @load="loadImage" :src="data.productMainPicUrl" />
      </div>
      <div>
        <h1>{{ data.productName }}</h1>
        <div class="hc-mb-16"><span class="hc-mr-16">价格</span><b style="font-size: 26px; font-weight: bold; color: rgb(254, 136, 36);">面议</b></div>
        <div><span class="hc-mr-16">周期</span> <span>面议</span></div>
      </div>
    </div>
    <div>
      <!-- 服务详情 -->
      <div class="hc-pd-8">
        <h2>服务详情</h2>
      </div>
      <div class="hc-pd-8 bg-white">
        <span v-html="data.productIntro"></span>
      </div>
      <!-- 联系电话 -->
    </div>
    <div>
      <div class="hc-pd-8">
        <h2>联系电话</h2>
      </div>
      <div class="hc-pd-8 bg-white">
        <div class="hc-pd-8">
          <h3>{{ concatInfo.orgInfoName }}</h3>
        </div>
        <div style="color:#8e9499">
          <div class="hc-pd-8">
            <custom-icon type="iconfont icon-gongsi"></custom-icon>
            {{ concatInfo.addressDetail || '暂无联系地址' }}
          </div>
          <div class="hc-pd-8"><Icon type="ios-phone-portrait" /> {{ concatInfo.contactsPhone || '暂无联系电话' }}</div>
          <div class="hc-pd-8">
            <custom-icon type="iconfont icon-phone"></custom-icon>
            {{ concatInfo.telephone || '暂无联系电话' }}
          </div>
          <div class="hc-pd-8"><custom-icon type="iconfont icon-email"></custom-icon> {{ concatInfo.email || '邮箱暂无数据' }}</div>
          <div class="hc-pd-8">
            <custom-icon type="iconfont icon-web"></custom-icon>
            <a v-if="concatInfo.officialWebsite && !$_.isEmpty(concatInfo.officialWebsite)" :href="concatInfo.officialWebsite" target="_blank"> {{ concatInfo.officialWebsite }}</a>
            <span v-else>暂无网站数据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomIcon from '../../../../components/custom-icon/custom-icon.vue'
export default {
  props: {
    data: Object
  },
  components: { CustomIcon },
  data() {
    return {
      detail: {},
      loading: false,
      concatInfo: {}
    }
  },
  computed: {},
  mounted() {
    this.getConactInfo()
  },
  methods: {
    loadImage() {
      this.loading = false
    },
    getConactInfo() {
      const { orgId } = this.data
      this.$http
        .post('/bioisp-api/company/platform/contact-info', {
          orgId
        })
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            this.concatInfo = rb.data.content || {}
          }
        })
        .catch(e => {})

      // https://bioisp-api.hsmap.com/company/platform/contact-info
      // orgId: 746
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
