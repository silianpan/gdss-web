<template>
  <div>
    <div style="hc-mb-16">
      <Card dis-hover>
        <SearchForm @on-search="handleSearch" ref="searchForm"></SearchForm>
      </Card>
    </div>
    <div class="hc-mt-8">
      <Table
        border
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
        show-total
        show-sizer
      />
    </div>
    <div v-else style="text-align:right">
      <Icon type="ios-bulb-outline"></Icon>
      <span style="color:rgba(0, 0, 0, 0.45)">没有更多数据</span>
    </div>
  </div>
</template>

<script>
import SearchForm from './search-form'
import TableMixin from '@/mixins/table-mixin'
export default {
  props: {
    role: Object
  },
  components: {
    SearchForm
  },
  mixins: [TableMixin],
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [
          {
            title: '用户名称',
            key: 'nickName',
            width: 400
          },
          {
            title: '登陆账号',
            width: 200,
            key: 'userName'
          },
          {
            title: '所在部门',
            // align: 'center',
            render: (h, params) => {
              const { deptInfo } = params.row
              return <span>{(deptInfo || {}).deptName || '-'}</span>
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const { roles } = params.row
              let _find = null
              if (roles && !this.$_.isEmpty(roles)) {
                _find = roles.find(r => r.id === this.role.id) || {}
              }
              if (_find && !this.$_.isEmpty(_find)) {
                return (
                  <Button
                    size="small"
                    type="error"
                    icon="md-redo"
                    onClick={() => {
                      this.handleUnsignAuthClick(params.row)
                    }}
                  >
                    取消
                  </Button>
                )
              } else {
                return (
                  <Button
                    size="small"
                    type="primary"
                    icon=" iconfont icon-sign"
                    onClick={() => {
                      this.handleSignAuthClick(params.row)
                    }}
                  >
                    授权
                  </Button>
                )
              }
            }
          }
        ],
        data: []
      }
    }
  },
  computed: {},
  mounted() {
    this.queryDatas()
  },
  methods: {
    // 数据查询
    async queryDatas() {
      this.loading = true
      const { pageIndex, pageSize } = this.pageOption
      const conditions = this.$refs.searchForm.getDatas()
      const qc = {
        page: {
          current: pageIndex,
          size: pageSize
        },
        conditions: conditions
      }
      this.$http
        .post('/api-gdss/upms/user/page/userInfo', qc)
        .then(res => {
          const { status, data } = res
          if (status === 200 && data.isOk) {
            this.tableOption.data = data.data.records
            this.pageOption.total = data.data.total
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleSignAuthClick(row) {
      this.$Modal.confirm({
        title: '授权确认',
        content: '您确认将此角色授权给此用户吗？',
        onOk: async () => {
          if (row && row.id) {
            this.$http
              .post('/api-gdss/upms/reUserRole/save', {
                roleId: this.role.id,
                userId: row.id
              })
              .then(res => {
                const { status, data } = res
                if (status === 200 && data.isOk) {
                  this.$Message.success(data.msg || '授权成功')
                }
                this.loading = false
                this.queryDatas()
              })
              .catch(e => {
                this.loading = false
              })
          } else {
            this.$Message.error('请选择需要授权的用户')
          }
        }
      })
    },
    handleUnsignAuthClick(row) {
      this.$Modal.confirm({
        title: '取消授权确认',
        content: '您确认取消此用户该角色的权限吗？',
        onOk: async () => {
          if (row && row.id) {
            this.$http
              .post('/api-gdss/upms/reUserRole/delete', {
                roleId: this.role.id,
                userId: row.id
              })
              .then(res => {
                const { status, data } = res
                if (status === 200 && data.isOk) {
                  this.$Message.success(data.msg || '取消成功')
                }
                this.loading = false
                this.queryDatas()
              })
              .catch(e => {
                this.loading = false
              })
          } else {
            this.$Message.error('请选择需要授权的用户')
          }
        }
      })
    }
  }
}
</script>

<style scoped></style>
