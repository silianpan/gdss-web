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
    <div class=" hc-mt-8 hc-mb-8" v-else style="text-align:right">
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
      status: '',
      loading: false,
      tableOption: {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '产品名称',
            key: 'en_name',
            render: (h, params) => {
              const row = params.row
              return (
                <span>
                  <a
                    on-click={() => {
                      this.handleDetail(row)
                    }}
                  >
                    {row.name}
                  </a>
                </span>
              )
            },
            minWidth: 200
          },
          {
            title: '注册人',
            key: 'cert_name',
            width: 200
          },
          {
            title: '管理类别',
            key: 'manage_type',
            width: 200
          },

          {
            title: '审批部门',
            key: 'sp_dept',
            width: 200
          },
          {
            title: '批准日期',
            key: 'pz_date',
            width: 200,
            sortable: true
          },
          {
            title: '有效期至',
            key: 'validate_date',
            width: 200,
            sortable: true
          }
        ],
        data: []
      },
      searchVal: ''
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
    async search(keywords, status) {
      this.searchVal = keywords
      this.status = status
      this.pageOption.pageIndex = 1
      this.queryDatas()
    },
    async queryDatas() {
      this.loading = true
      // 组装查询参数
      const qc = {
        keywords: this.searchVal,
        pageIndex: this.pageOption.pageIndex,
        pageSize: this.pageOption.pageSize,
        db: 'bio_instrument',
        tableId: 'import'
      }
      if (!this.status) {
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
      } else {
        this.$http
          .post('/api-gdss/search/prequery', qc)
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
}
</script>

<style scoped></style>
