<template>
  <div>
    <div class="result-title hc-mb-16">
      <div class="item-source">{{ item.catalog }}</div>
      <div class="item-title" v-html="item.title" @click="handleView"></div>
    </div>
    <div class="table-content">
      <!-- <div class="pd-10 line">
        <div class="table-title">
          <b class="hc-mr-16">文号:</b><span>国卫医发〔2016〕45号</span>
        </div>
      </div> -->
      <div class="line">
        <div class="pd-10">
          <div class="item-words">
            <b>摘要：</b>
            <span v-html="item.content"></span>
          </div>
        </div>
      </div>
    </div>
    <b style="color: #008000;">公文检索服务系统</b>&nbsp;-
    <span>&nbsp;{{ item.crtDate }}&nbsp;</span>
  </div>
</template>

<script>
import Mixin from './mixin'
export default {
  mixins: [Mixin],
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.result-title {
  height: 30px;
  display: flex;
  .item-source {
    // display: inline-block;
    flex: 1 0 auto;
    height: 25px;
    padding: 0 10px;
    background-color: #3f51b5;
    color: white;
    font-size: 15px;
    line-height: 25px;
    vertical-align: middle;
    margin-right: 10px;
    margin-top: 2.5px;
  }
  .item-title {
    flex: auto;
    cursor: pointer;
    width: 650px;
    display: inline-block;
    height: 25px;
    font-size: 17px;
    color: #004276;
    line-height: 25px;
    vertical-align: middle;
    margin-top: 2.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.table-content {
  border: 1px solid #e1e1e0;
  border-bottom: none;
  border-right: none;
  margin-bottom: 7px;
  width: 529px;

  .line {
    border: 1px solid #e1e1e0;
    border-top: none;
    border-left: none;
  }
  .table-title {
    padding: 0 !important;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
