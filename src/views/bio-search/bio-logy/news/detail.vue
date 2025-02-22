<template>
  <div class="detail-wrapper">
    <Spin v-if="loading" fix large>
      <h-loading></h-loading>
    </Spin>
    <div class="title">
      <h1>{{ data.title }}</h1>
    </div>
    <div v-if="data.others && data.others.pub_date">
      <span>发布时间</span
      ><span class="hc-ml-16" style="color:#3b97f6">
        {{ data.others.pub_date }}</span
      >
    </div>
    <div>
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
  padding: 0 16px;
  .title {
    font-size: 16px;
    color: #0042a2 !important;
    position: relative;
  }
}
</style>
