<template>
  <div class="user-wrap">
    <div class="user-wrap-content i-scrollbar-hide fh">
      <div class="bg-white hc-pd-16">
        <div>
          <span style="font-weight:600;font-size:20px;line-height:20px;"
            >菜单管理</span
          >
        </div>
      </div>
      <div class="hc-mt-8">
        <Button type="primary" icon="md-add" @click="handleAddClick"
          >新增</Button
        >
      </div>
      <div class="hc-mt-8">
        <Table
          row-key="id"
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
import TableMixin from '@/mixins/table-mixin'
import FormCmp from './components/form-cmp'
import ActionFormContainer from '@/components/form-container/action-form-container'
export default {
  components: {},
  mixins: [TableMixin],
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [
          {
            title: '菜单名称',
            key: 'title',
            tree: true
          },
          {
            title: '图标',
            align: 'center',
            width: 80,
            render: (h, params) => {
              const { iconCls, iconImage } = params.row
              const c = []
              if (iconCls) {
                c.push(<custom-icon size="20" type={iconCls}></custom-icon>)
              }
              if (iconImage) {
                c.push(
                  <img
                    style=" width: 30px;height: 30px;border-radius: 4px;"
                    src={iconImage}
                  ></img>
                )
              }
              return <div>{c}</div>
            }
          },
          {
            title: 'path',
            key: 'path'
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
    //, 更改菜单 启用 or 禁用 状态
    handleChangeEnabled(row, value) {
      if (row.id && !this.$_.isEmpty(row.id)) {
        this.$http
          .get('/api-gdss/upms/menu/change/enable', { id: row.id, enable: value })
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
      const qc = {
        page: {
          current: pageIndex,
          size: pageSize
        }
      }
      this.$http
        .post('/api-gdss/upms/menu/page/tree/menus', qc)
        .then(res => {
          const { status, data } = res
          if (status === 200 && data.isOk) {
            this.tableOption.data = data.data.records || []
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
      this.showFormDrawer({ title: '新增菜单' }, {})
    },
    // 进行修改
    handleModifyClick(row) {
      this.showFormDrawer({ title: '修改' }, { ...row })
    },
    // 进行逻辑删除
    handleRemoveClick(row) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '您确认删除此所选的菜单？',
        onOk: async () => {
          if (row && row.id) {
            this.$http
              .get('/api-gdss/upms/menu/delete', { id: row.id })
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
            this.$Message.error('请选择需要删除菜单')
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
      const res = await this.$http.post('/api-gdss/upms/menu/save', formDatas)
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
