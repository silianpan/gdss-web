<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div style="padding-bottom:8px;">
      <Breadcrumb>
        <BreadcrumbItem to="/search">首页</BreadcrumbItem>
        <BreadcrumbItem>生物服务</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="s-input-wrapper bg-white">
      <div>
        <Input clearable v-model.trim="searchVal" size="large" placeholder="请输入关键字" class="s-input" />
        <Button class="hc-ml-16" @click="handleSearch" type="warning" size="large">搜索</Button>
        <Button class="hc-ml-16" size="large" @click="handleReset">重置</Button>
      </div>
    </div>
    <div class="s-condition-wrapper hc-mt-10 bg-white">
      <div class="hc-tabs-wrapper">
        <Tabs type="card" v-model="curTab" @on-click="handleTabClick">
          <TabPane label="技术服务" name="JiShu"></TabPane>
          <TabPane label="综合服务" name="ZhoneHe"></TabPane>
        </Tabs>
      </div>
    </div>
    <div class="s-body-wrapper hc-mt-10  fh scrollbar-y" style="overflow-x:hidden;">
      <div class="s-content-wrapper ">
        <component :is="curTab" ref="comp"></component>
      </div>
    </div>
  </div>
</template>

<script>
import JiShu from './ji-shu'
import ZhoneHe from './zhong-he'
export default {
  mixins: [],
  components: {
    JiShu,
    ZhoneHe
  },
  data() {
    return {
      searchVal: '',
      curTab: 'JiShu'
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleTabClick() {
      this.$nextTick(() => {
        // this.handleSearch()
      })
    },
    handleReset() {
      this.searchVal = ''
      this.handleSearch()
    },
    handleSearch() {
      this.$refs.comp.handleSearch(this.searchVal)
    }
  }
}
</script>
<style lang="less">
.biotown-others-wrapper {
  display: flex;
  width: 100%;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  .biotown-others-item {
    display: flex;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #9e9e9e4f;
    padding: 16px;
    margin-bottom: 8px;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .actived {
    border: 2px solid #5c6bc0;
  }
  .disabled {
    border: none;
    color: #dcdee2;
    pointer-events: none;
  }
}

.hc-tabs-wrapper > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}

.hc-tabs-wrapper .ivu-tabs-bar {
  margin-bottom: 0px;
}
.hc-tabs-wrapper > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-top: 1px solid #2d8cf0;
  color: white;
  background: #2d8cf0;
}
@import url('./index.less');
</style>
