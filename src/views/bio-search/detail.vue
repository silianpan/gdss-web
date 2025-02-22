<template>
  <div class="detail-wrapper fh">
    <Spin v-if="loading" fix large>
      <h-loading></h-loading>
    </Spin>
    <div v-if="data" class="detail-content bg-white fh">
      <component :is="curCmp" :data="data"></component>
    </div>
    <div
      v-else
      class="fh detail-wrapper bg-white"
      style=" justify-content: center;width:100%;"
    >
      <h-empty></h-empty>
    </div>
  </div>
</template>

<script>
import ZhengCeFaGuiDetail from './zheng-ce-fa-gui/detail'
import HangYeZiXunDetail from './hang-ye-zi-xun/detail'
export default {
  components: {
    ZhengCeFaGuiDetail,
    HangYeZiXunDetail
  },
  data() {
    return {
      loading: false,
      detailComp: {
        zcfg: 'ZhengCeFaGuiDetail',
        hyzx: 'HangYeZiXunDetail'
      },
      data: {}
    }
  },
  computed: {
    curCmp() {
      return this.detailComp[this.$route.query.type || ''] || 'h-empty'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.data) {
        this.loading = true
        this.$http
          .get(`/dbapi/${this.$route.query.data}`)
          .then(rb => {
            const { status } = rb
            if (status === 200) {
              this.data = rb.data || {}
            }
            this.loading = false
          })
          .catch(e => {
            this.loading = false
          })
      }
    }
  }
}
</script>
<style lang="less" scope>
@media (min-width: 576px) {
}
.detail-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  .detail-content {
    width: 70%;
    min-width: 760px;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
