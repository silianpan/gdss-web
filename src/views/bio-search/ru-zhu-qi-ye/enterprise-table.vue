<template>
  <div>
    <div class="hc-mt-8">
      <Table
        :loading="loading"
        :columns="tableOption.columns"
        :data="tableOption.data"
      ></Table>
    </div>
    <div class="hc-mt-8" v-if="pageOption.total > pageOption.pageSize">
      <Page
        transfer
        @on-page-size-change="handlePageSizeChange"
        @on-change="handlePageIndexChange"
        :total="pageOption.total"
        :current="pageOption.pageIndex"
        :page-size="pageOption.pageSize"
        show-total
        show-sizer
      />
    </div>
    <div class="hc-mt-8" v-else style="text-align:right">
      <Icon type="ios-bulb-outline"></Icon>
      <span style="color:rgba(0, 0, 0, 0.45)">没有更多数据</span>
    </div>
  </div>
</template>

<script>
import TableMixin from '@/mixins/table-mixin'
import Detail from './detail'
export default {
  mixins: [TableMixin],
  components: {},
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '企业名称',
            minWidth: 200,
            render: (h, params) => {
              const row = params.row
              return (
                <a
                  on-click={() => {
                    this.handleDetail(row)
                  }}
                >
                  <div domPropsInnerHTML={row.eps_name}></div>
                </a>
              )
            }
          },
          {
            title: '许可证编号',
            key: 'product_sn',
            minWidth: 200,
            render: (h, params) => {
              const row = params.row
              return <div domPropsInnerHTML={row.product_sn}></div>
            }
          },
          {
            title: '社会信用代码',
            key: 'business_license_number',
            minWidth: 200
          },
          {
            title: '省份',
            key: 'esp_province',
            minWidth: 200,
            render: (h, params) => {
              const row = params.row
              return <div domPropsInnerHTML={row.esp_province}></div>
            }
          },

          {
            title: '发证机关',
            key: 'qf_manager_name',
            minWidth: 200
          },
          {
            title: '发证日期',
            key: 'xk_date_str',

            minWidth: 200,
            sortable: true
          },
          {
            title: '有效期至',
            key: 'xk_date',
            minWidth: 200,
            sortable: true
          }
        ],
        data: []
      },
      searchCondition: {}
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleDetail(row) {
      const drawer = this.$ddr.create(
        {
          width: '60%',
          components: {},
          render: (
            <div style="background-color:#f5f7f9">
              <Detail data={row}></Detail>
            </div>
          )
        },
        this
      )
      drawer.show()
    },
    async search({ keywords, filters }) {
      this.searchCondition = { keywords, filters }
      this.pageOption.pageIndex = 1
      this.queryDatas()
    },
    async queryDatas() {
      this.loading = true
      // 组装查询参数
      const { keywords, filters } = this.searchCondition
      const qc = {
        keywords: keywords || '',
        filters: filters || [],
        pageIndex: this.pageOption.pageIndex,
        pageSize: this.pageOption.pageSize,
        // highLight: true,
        db: 'bio_enterprise',
        tableId: 'npma'
      }
      this.$http
        .post('/api-gdss/search/query', qc)
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            if (rb.data.isOk === true) {
              this.tableOption.data = rb.data.data.records || []
              this.pageOption.total = rb.data.data.total
            }
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped></style>
