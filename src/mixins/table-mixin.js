export default {
  data() {
    return {
      loading: true,
      pageOption: {
        total: 0,
        pageSize: 10,
        pageIndex: 1
      }
    }
  },
  mounted() {},
  methods: {
    handleSearch() {
      this.pageOption.pageIndex = 1
      this.queryDatas()
    },
    queryDatas() {},
    // 页码发生变化
    handlePageIndexChange(pageIndex) {
      this.pageOption.pageIndex = pageIndex
      this.queryDatas()
    },
    // 页面大小发生变化
    handlePageSizeChange(pageSize) {
      this.pageOption.pageSize = pageSize
      this.queryDatas()
    }
  }
}
