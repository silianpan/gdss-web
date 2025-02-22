<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div style="padding-bottom:8px;">
      <Breadcrumb>
        <BreadcrumbItem to="/search">首页</BreadcrumbItem>
        <BreadcrumbItem>医疗器械</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="s-input-wrapper bg-white">
      <div>
        <Input clearable v-model.trim="searchVal" size="large" placeholder="请输入名称、用途、类别、编号" class="s-input" />
        <Button class="hc-ml-16" @click="handleSearch" type="warning" size="large">搜索</Button>
        <Button class="hc-ml-16" size="large" @click="handleReset">重置</Button>
        <Tooltip content="在精确搜索时请按照'产品名称'，'注册人'，'管理类别'，'注册证编号'的顺序来进行单个或组合查询，组合中间请用';'隔开，所有的输入内容请均完整输入" placement='right' theme='dark' max-width='200'>
          <i-switch class="hc-ml-16" size="large" value = 'false' v-model="switchStatus" @on-change="searchChange">
            <span slot="close">模糊</span>
            <span slot="open">精确</span>
          </i-switch>
        </Tooltip>

      </div>
    </div>
    <div class="s-condition-wrapper hc-mt-10 bg-white">
      <div class="hc-tabs-wrapper">
        <Tabs type="card" v-model="curTab" @on-click="handleTabClick">
          <TabPane label="国产器械" name="InstrumentChina"></TabPane>
          <TabPane label="进口器械" name="InstrumentImport"></TabPane>
        </Tabs>
      </div>
    </div>
    <div class="s-body-wrapper hc-mt-10  fh scrollbar-y" style="overflow-x:hidden;">
      <div class="s-content-wrapper hc-pd-16 bg-white">
        <component :is="curTab" ref="table"></component>
      </div>
    </div>
  </div>
</template>

<script>
import InstrumentChina from './china/table-page'
import InstrumentImport from './import/table-page'
export default {
  mixins: [],
  components: {
    InstrumentChina,
    InstrumentImport
  },
  data() {
    return {
      searchVal: '',
      curTab: 'InstrumentChina',
      switchStatus: false
    }
  },
  computed: {},
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleTabClick(tabname) {
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    handleReset() {
      this.searchVal = ''
      this.handleSearch()
    },
    handleSearch() {
      this.$refs.table.search(this.searchVal, this.switchStatus)
    },
    goHome() {
      this.$router.push({
        name: 'biotown_search_route'
      })
    },
    searchChange(status) {
      if (!status) {
        this.$Message.success({
          content: '切换为模糊搜索'
        })
      } else {
        this.$Message.success({
          background: true,
          content: '切换为精确搜索'
        })
      }
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
