<template>
  <div class="hyzx-wrapper">
    <div class="title">
      <h1>{{ data.title }}</h1>
    </div>
    <div>
      <span>来源</span
      ><span class="hc-ml-16" style="color:#3b97f6">{{ data.source }}</span>
      <span class="hc-ml-16">
        {{ data.pub_date }}
      </span>
    </div>
    <div v-html="data.content"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
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
