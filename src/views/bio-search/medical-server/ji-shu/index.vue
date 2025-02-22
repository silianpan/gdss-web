<template>
  <div>
    <div class="bg-white hc-pd-16">
      <SearchForm ref="searchForm" @on-search="handleSearch"></SearchForm>
    </div>
    <div class="hc-mt-10">
      <Spin v-if="loading" fix large></Spin>
      <div class="s-content-wrapper  bg-white">
        <div class="content-list-wrapper hc-pd-16">
          <h-empty v-if="$_.isEmpty(results)"></h-empty>
          <div v-else v-for="(r, index) in results" :key="index" class="content-list-item">
            <Item :data="r"></Item>
          </div>
        </div>
      </div>
      <BackTop :right="350" :bottom="100"> </BackTop>
    </div>
    <div class="hc-pd-8" v-if="results.length < pageOption.total">
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
import Item from './item'
export default {
  mixins: [TableMixin],
  components: {
    SearchForm,
    Item
  },
  data() {
    return {
      loading: false,
      // 搜索结果
      results: []
    }
  },
  computed: {},
  mounted() {
    this.handleSearch()
  },
  methods: {
    // 按条查询内容
    async queryDatas(searchVal) {
      this.loading = true
      this.results = []
      const filterConditions = this.$refs.searchForm.getDatas()
      const qc = {
        productType: 2,
        current: this.pageOption.pageIndex,
        areaCode: '',
        keyWords: searchVal || '',
        pageSize: this.pageOption.pageSize,
        ...filterConditions
      }
      this.$http
        .post('/bioisp-api/fmall/product/detail/list-page', qc)
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            this.results = rb.data.content.data || []
            this.pageOption.total = rb.data.content.total
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleSearch(searchVal) {
      this.pageOption.pageIndex = 1
      this.queryDatas(searchVal)
    }
  }
}
</script>

<style scoped></style>
