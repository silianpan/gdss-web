<!--  -->
<template>
  <div class="action-form-container">
    <div class="hc-mt-8">
      <Button @click="handleGoBackClick" class="hc-mr-16" icon="ios-arrow-back">返回</Button>
      <Button @click="handleSaveClick" :loading="isBtnLoading" type="primary" color="blue">保存</Button>
    </div>
    <div class="action-form-body hc-mt-8 i-scrollbar-hide">
      <div style="position: relative;">
        <Spin size="large" fix v-if="isBtnLoading"></Spin>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import FormContainerMixin from '@/mixins/form-container-mixin'
export default {
  mixins: [FormContainerMixin],
  props: {
    beforeBack: Function,
    afterSaveAction: Function,
    saveAction: {
      default: async () => {}
    }
  },
  mounted: function() {},
  computed: {}
}
</script>
<style lang="less" scoped>
.action-form-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.action-form-body {
  background: rgb(247, 247, 247);
  height: calc(100% - 50px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
