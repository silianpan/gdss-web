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
            title: '用户名称',
            key: 'nickName',
            fixed: 'left',
            width: 400,
            render: (h, params) => {
              const { userName, nickName } = params.row
              return (
                <div>
                  <Avatar style="color: #fff;background-color: #2196f3">
                    {userName}
                  </Avatar>{' '}
                  {nickName}
                </div>
              )
            }
          },
          {
            title: '登陆账号',
            width: 240,
            key: 'userName'
          },
          {
            title: '角色',
            align: 'center',
            width: 220,
            render: (h, params) => {
              const { roles } = params.row
              if (roles && !this.$_.isEmpty(roles)) {
                const tags = roles.map(n => <Tag>{n.name}</Tag>)
                return <div>{tags}</div>
              }
              return <span></span>
            }
          },
          {
            title: '启用状态',
            width: 150,
            key: 'enabled',
            render: (h, params) => {
              const row = params.row
              return (
                <i-switch
                  beforeChange={() =>
                    new Promise(resolve => {
                      const opt = row.enabled ? '禁用' : '启用'
                      this.$Modal.confirm({
                        title: `${opt}确认`,
                        content: `您确认${opt}此用户吗？`,
                        onOk: () => {
                          resolve()
                        }
                      })
                    })
                  }
                  value={row.enabled}
                  onon-change={value => this.handleChangeEnabled(row, value)}
                  class="hc-ml-16"
                  true-color="#13ce66"
                  false-color="#ff4949"
                  size="large"
                >
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              )
            }
          },
          {
            title: '最近一次登录时间',
            key: 'lastLoginTime',
            width: 220
          },
          {
            title: '最近一次ip',
            key: 'loginIp',
            width: 220
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              const row = params.row
              return (
                <ButtonGroup>
                  <Button
                    size="small"
                    type="info"
                    onClick={() => this.handleResetPwdClick(row)}
                  >
                    重置密码
                  </Button>
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
    handleResetPwdClick(row) {
      // 重置用户密码
      this.$Modal.confirm({
        title: '重置确认',
        content: '重置后密码与登陆账户一致，是否继续操作',
        onOk: async () => {
          if (row.id && !this.$_.isEmpty(row.id)) {
            this.$http
              .get(`api/upms/user/reset/pwd/${row.id}`)
              .then(res => {
                const { status, data } = res
                if (status === 200 && data.isOk) {
                  this.$Message.success(data.msg || '重置成功')
                } else {
                  this.$Message.error('操作失败')
                }
                this.queryDatas()
              })
              .catch(e => {
                this.$Message.error('操作失败')
              })
          } else {
            this.$Message.error('请选择需要重置的账号')
          }
        }
      })
    },
    // 更改用户 启用 or 禁用 状态
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

    // 新增操作
    handleAddClick() {
      this.showFormDrawer({ title: '新增用户' }, {})
    },
    // 进行修改
    handleModifyClick(row) {
      this.showFormDrawer({ title: '修改' }, { ...row })
    },
    // 进行逻辑删除
    handleRemoveClick(row) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '您确认删除此所选的用户？',
        onOk: async () => {
          if (row && row.id) {
            this.$http
              .get('/api-gdss/upms/user/delete', { id: row.id })
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
            this.$Message.error('请选择需要删除用户')
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
      const res = await this.$http.post('/api-gdss/upms/user/save', formDatas)
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
