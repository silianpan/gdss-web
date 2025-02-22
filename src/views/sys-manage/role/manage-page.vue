<template>
  <div class="role-wrap">
    <div class="role-wrap-content i-scrollbar-hide fh">
      <div class="bg-white hc-pd-16">
        <div>
          <span style="font-weight:600;font-size:20px;line-height:20px;"
            >平台角色</span
          >
        </div>
        <div style="overflow:hidden;padding-top:12px;">
          <div style="display:flex;width:100%;">
            <div style="flex:auto">
              示意：整个系统所有角色，系统角色不可进行删除，及授权操作
            </div>
            <div style="width: 155px; ">
              <img
                data-v-654f0663
                src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
                style="width: 100%;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="hc-mt-10">
        <div>
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
  </div>
</template>

<script>
import TableMixin from '@/mixins/table-mixin'
import FormCmp from './components/form-cmp'
import ActionFormContainer from '@/components/form-container/action-form-container'
import SignAuthPage from './sign-auth-page'
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
            title: '角色名称',
            key: 'name'
          },
          {
            title: '角色编码',
            key: 'code'
          },
          {
            title: '用户数',
            render: (h, params) => {
              const { users } = params.row
              if (users && !this.$_.isEmpty(users)) {
                return (
                  <div>
                    <span style="color:#2196f3">{users.length}</span>
                    <span style="font-size:8px;">人</span>
                  </div>
                )
              }
              return <span>-</span>
            }
          },

          {
            title: '角色类型',
            render: (h, params) => {
              const { type } = params.row
              if (type === 'bus') {
                return <Tag color="primary">业务角色</Tag>
              }
              if (type === 'sys') {
                return <Tag>系统角色</Tag>
              }
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
                    type="info"
                    disabled={row.type === 'sys'}
                    icon=" iconfont icon-ziliaoshouquanguanli-"
                    onClick={() => {
                      this.handleSignPerClick(row)
                    }}
                  >
                    授权
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
                    disabled={row.type === 'sys'}
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
    // 数据查询
    async queryDatas() {
      this.loading = true
      const { pageIndex, pageSize } = this.pageOption
      const qc = {
        page: {
          current: pageIndex,
          size: pageSize
        },
        conditions: {}
      }
      this.$http
        .post('/api-gdss/upms/role/page/roleInfo', qc)
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
      this.showFormDrawer(
        {
          title: '新增角色'
        },
        {}
      )
    },
    // 进行修改
    handleModifyClick(row) {
      this.showFormDrawer(
        {
          title: '修改'
        },
        {
          ...row
        }
      )
    },
    // 进行逻辑删除
    handleRemoveClick(row) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '您确认删除此所选的角色？',
        onOk: async () => {
          if (row && row.id) {
            this.$http
              .get('/api-gdss/upms/role/delete', { id: row.id })
              .then(res => {
                const { status, data } = res
                if (status === 200 && data.isOk) {
                  this.$Message.success(data.msg)
                } else {
                  this.$Message.error('操作失败')
                }
                this.queryDatas()
              })
              .catch(e => {
                this.$Message.error('操作失败')
              })
          } else {
            this.$Message.error('请选择需要删除角色')
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
      const res = await this.$http.post('/api-gdss/upms/role/saveForm', formDatas)
      const { status, data } = res
      if (status === 200 && data.isOk) {
        this.$Message.success(data.msg || '保存成功')
      } else {
        this.$Message.error(data.msg || '保存失败')
      }
      return data.isOk
    },
    // 授权
    handleSignPerClick(row) {
      //
      const drawer = this.$ddr.create(
        {
          title: '授权',
          maskClosable: false,
          onClose: () => {
            this.queryDatas()
          },
          width: 80,
          render: <SignAuthPage role={row}></SignAuthPage>
        },
        this
      )
      drawer.show()
    }
  }
}
</script>

<style lang="less" scoped>
.role-wrap {
  position: relative;
  height: 100%;
  .role-wrap-content {
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
