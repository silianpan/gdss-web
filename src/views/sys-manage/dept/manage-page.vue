<template>
  <div class="user-wrap">
    <div class="user-wrap-content i-scrollbar-hide fh">
      <div>
        <Card dis-hover>
          <SearchForm @on-search="handleSearch" ref="searchForm"></SearchForm>
        </Card>
      </div>
      <div class="hc-mt-8">
        <Button type="primary" icon="md-add" @click="handleAddClick"
          >新增</Button
        >
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
  </div>
</template>

<script>
import SearchForm from './search-form'
import TableMixin from '@/mixins/table-mixin'
import FormCmp from './components/form-cmp'
import ActionFormContainer from '@/components/form-container/action-form-container'
export default {
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
            title: '部门名称',
            key: 'deptName'
          },
          {
            title: '部门人数',
            key: 'memberCnt',
            render: (h, params) => {
              const { memberCnt } = params.row
              return <a>{memberCnt || 0}</a>
            }
          },
          {
            title: '部门负责人',
            width: 220,
            render: (h, params) => {
              const { leaderInfo } = params.row
              return <span>{(leaderInfo || {}).nickName}</span>
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {
              const row = params.row
              return (
                <ButtonGroup>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      this.handleModifyClick(row)
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    size="small"
                    type="error"
                    icon="md-trash"
                    onClick={() => {
                      this.handleRemoveClick(row)
                    }}
                  >
                    移除
                  </Button>
                </ButtonGroup>
              )
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
    // 更改部门 启用 or 禁用 状态
    handleChangeEnabled(row, value) {
      if (row.id && !this.$_.isEmpty(row.id)) {
        this.$http
          .get('/api-gdss/upms/user/change/enable', { id: row.id, enable: value })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.$Message.success(data.msg)
            }
            this.queryDatas()
          })
          .catch(e => {
            this.$Message.error('操作失败')
          })
      }
    },
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
        .post('/api-gdss/upms/dept/page/info', qc)
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

    // 新增操作
    handleAddClick() {
      this.showFormDrawer({ title: '新增部门' }, {})
    },
    // 进行修改
    handleModifyClick(row) {
      this.showFormDrawer({ title: '修改' }, { ...row })
    },
    // 进行逻辑删除
    handleRemoveClick(row) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '您确认删除此所选的部门？',
        onOk: async () => {
          if (row && row.deptId) {
            this.$http
              .get('/api-gdss/upms/dept/delete', { id: row.deptId })
              .then(res => {
                const { status, data } = res
                if (status === 200 && data.isOk) {
                  this.$Message.success(data.msg || '删除成功')
                }
                this.queryDatas()
              })
              .catch(e => {
                this.$Message.error('操作失败')
              })
          } else {
            this.$Message.error('请选择需要删除部门')
          }
        }
      })
    },
    // 打开表单drawer
    showFormDrawer(drawerOption, formDatas) {
      const { title, width } = drawerOption
      const drawer = this.$ddr.create(
        {
          title: title,
          maskClosable: false,
          width: width || 720,
          onClose: () => {
            this.queryDatas()
          },
          render: (
            <ActionFormContainer saveAction={this.handleSaveClick}>
              <FormCmp data={formDatas}></FormCmp>
            </ActionFormContainer>
          )
        },
        this
      )
      drawer.show()
    },
    // 保存数据
    async handleSaveClick(formDatas) {
      console.log(formDatas)
      const res = await this.$http.post('/api-gdss/upms/dept/save', formDatas)
      const { status, data } = res
      if (status === 200 && data.isOk) {
        this.$Message.success(data.msg || '保存成功')
      } else {
        this.$Message.error(data.msg || '保存失败')
      }
      return data.isOk
    }
  }
}
</script>

<style lang="less" scoped>
.user-wrap {
  position: relative;
  height: 100%;
  .user-wrap-content {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
