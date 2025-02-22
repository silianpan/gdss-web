<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div style="padding-bottom:8px;">
      <Breadcrumb>
        <BreadcrumbItem to="/search">首页</BreadcrumbItem>
        <BreadcrumbItem>行业资讯</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="s-input-wrapper hc-mt-10 bg-white">
      <div>
        <Input clearable v-model.trim="searchVal" size="large" placeholder="请输入资讯内容" class="s-input" />
        <Button class="hc-ml-16" @click="handleSearch" type="warning" size="large">搜索</Button>
        <Button class="hc-ml-16" size="large" @click="handleReset">重置</Button>
      </div>
    </div>
    <div class="s-condition-wrapper hc-mt-10 bg-white">
      <SearchForm ref="searchForm" @on-search="handleSearch"></SearchForm>
    </div>
    <div class="s-body-wrapper hc-mt-10 fh scrollbar-y" style="overflow-x:hidden;">
      <Spin v-if="loading" fix large></Spin>
      <div class="s-content-wrapper  bg-white">
        <div class="content-list-wrapper hc-pd-16">
          <h-empty v-if="$_.isEmpty(results)"></h-empty>
          <div v-else v-for="(r, index) in results" :key="index" class="content-list-item">
            <ZiXunItem :data="r"></ZiXunItem>
          </div>
        </div>
      </div>
      <BackTop :right="350" :bottom="100"> </BackTop>
    </div>
    <div class="s-footer-wrapper hc-pd-8" v-if="results.length < pageOption.total">
      <Page
        :total="pageOption.total"
        :current="pageOption.pageIndex"
        show-total
        :page-size="pageOption.pageSize"
        transfer
        @on-page-size-change="handlePageSizeChange"
        @on-change="handlePageIndexChange"
      />
    </div>
  </div>
</template>

<script>
import TableMixin from '@/mixins/table-mixin'
import SearchForm from './search-form'
import ZiXunItem from './item'
export default {
  mixins: [TableMixin],
  components: {
    SearchForm,
    ZiXunItem
  },
  data() {
    return {
      loading: false,
      searchVal: '',
      // 搜索结果
      results: []
    }
  },
  computed: {},
  mounted() {
    this.queryDatas()
  },
  methods: {
    handleReset() {
      this.searchVal = ''
      this.$refs.searchForm.reset()
    },
    // 按条查询内容
    async queryDatas() {
      this.loading = true
      this.results = []
      // 组装查询参数
      const filterConditions = this.$refs.searchForm.getDatas()
      const qc = {
        keywords: this.searchVal,
        filters: filterConditions,
        pageIndex: this.pageOption.pageIndex,
        pageSize: this.pageOption.pageSize,
        db: 'bio_search',
        tableId: 'realtime_info',
        highLight: true
      }
      this.$http
        .post('/api-gdss/search/query', qc)
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            if (rb.data.isOk === true) {
              this.results = rb.data.data.records || []
              this.pageOption.total = rb.data.data.total
            }
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleSearch() {
      this.pageOption.pageIndex = 1
      this.queryDatas()
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
