<template>
  <div class="zcfg-wrapper">
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
.zcfg-wrapper {
  .title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: #36c;
    margin: 32px 0;
  }
  .content {
    padding: 8px 16px;
  }
  .hbg {
    background-color: #ebf0fa;
  }
}
</style>
