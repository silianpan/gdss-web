<template>
  <div class="detail-wrapper">
    <Spin v-if="loading" fix large>
      <h-loading></h-loading>
    </Spin>
    <div class="title">{{ data.title }}</div>
    <div class="hc-pd-8  hbg">服务内容： {{ data.others.server_content }}</div>
    <div class="hc-pd-8  ">联系电话： {{ data.others.telephone }}</div>

    <div class="hc-pd-8 hbg ">
      <b>服务介绍:</b>
      <div v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String
  },
  components: {},
  data() {
    return {
      loading: false,
      data: {}
    }
  },
  computed: {},
  mounted() {
    this.queryDetail()
  },
  methods: {
    queryDetail() {
      this.loading = true
      this.$http
        .get(`/dbapi/${this.url}`)
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
</script>

<style lang="less" scoped>
.detail-wrapper {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 700;
    color: #36c;
    margin: 8px 0;
  }
  .content {
    padding: 8px 16px;
  }
  .hbg {
    background-color: #ebf0fa;
  }

  img {
    float: none;
    margin-right: 20px;
    margin-top: 5px;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
