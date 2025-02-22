<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div style="padding-bottom:8px;">
      <Breadcrumb>
        <BreadcrumbItem to="/search">首页</BreadcrumbItem>
        <BreadcrumbItem>医药企业</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="s-input-wrapper bg-white">
      <div>
        <Input
          clearable
          v-model.trim="searchVal"
          size="large"
          placeholder="请输入企业名称或许可证编号或社会信用代码"
          class="s-input"
        />
        <Button
          class="hc-ml-16"
          @click="handleSearch"
          type="warning"
          size="large"
          >搜索</Button
        >
        <Button class="hc-ml-16" size="large" @click="handleReset">重置</Button>
      </div>
    </div>
    <div class="s-condition-wrapper hc-mt-10 bg-white">
      <SearchForm ref="searchForm" @on-search="handleSearch"></SearchForm>
    </div>
    <div
      class="s-body-wrapper hc-mt-10 fh scrollbar-y"
      style="overflow-x:hidden;"
    >
      <div class="s-content-wrapper bg-white ">
        <div class="content-list-wrapper hc-pd-16">
          <EnterpriseTable ref="table"></EnterpriseTable>
        </div>
      </div>
      <BackTop :right="350" :bottom="100"> </BackTop>
    </div>
  </div>
</template>

<script>
import TableMixin from '@/mixins/table-mixin'
import SearchForm from './search-form'
import EnterpriseTable from './enterprise-table'
export default {
  mixins: [TableMixin],
  components: {
    SearchForm,
    EnterpriseTable
  },
  data() {
    return {
      searchVal: ''
    }
  },
  computed: {},
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleReset() {
      this.searchVal = ''
      this.$refs.searchForm.reset()
    },
    handleSearch() {
      const filterConditions = this.$refs.searchForm.getDatas()
      this.$refs.table.search({
        keywords: this.searchVal,
        filters: filterConditions
      })
    }
  }
}
</script>
<style lang="less">
@import url('./index.less');
</style>
