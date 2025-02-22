<template>
  <div class="bio-s-wrapper fh" @keyup.enter="handleSearch">
    <div style="padding-bottom:8px;">
      <Breadcrumb>
        <BreadcrumbItem to="/search">首页</BreadcrumbItem>
        <BreadcrumbItem to="/others/search">其他生物城</BreadcrumbItem>
        <BreadcrumbItem>中关村国家自主创新示范区</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="s-input-wrapper bg-white">
      <div>
        <Input
          clearable
          v-model.trim="searchVal"
          size="large"
          placeholder="请输入查询内容"
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
      <Spin v-if="loading" fix large>
        <h-loading></h-loading>
      </Spin>
      <div class="s-content-wrapper bg-white">
        <div class="content-list-wrapper hc-pd-16">
          <h-empty v-if="$_.isEmpty(results)"></h-empty>
          <div
            v-else
            v-for="(r, index) in results"
            :key="index"
            class="content-list-item"
            style="display:flex;width:80%"
          >
            <NewsItem :data="r" v-if="['dynamic', 'report', 'notice'].indexOf(r.classify) > -1" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="s-footer-wrapper hc-pd-8"
      v-if="results.length < pageOption.total"
    >
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
import NewsItem from './news/item'
export default {
  mixins: [TableMixin],
  components: {
    SearchForm,
    NewsItem
  },
  data() {
    return {
      loading: false,
      searchVal: '',
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
        highLight: true,
        db: 'bio_others',
        tableId: 'bjcbp'
      }
      this.$http
        .post('/api-gdss/search/query', qc)
        .then(res => {
          if (res.status === 200) {
            if (res.data.isOk === true) {
              this.results = res.data.data.records || []
              this.pageOption.total = res.data.data.total
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
    },
    goHome() {
      this.$router.push({
        name: 'biotown_search_route'
      })
    }
  }
}
</script>
<style lang="less" scoped>
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

@import url('./index.less');
</style>
