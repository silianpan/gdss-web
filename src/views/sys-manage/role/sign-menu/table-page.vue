<template>
  <div>
    <div>
      <Table
        row-key="id"
        border
        :loading="loading"
        :columns="tableOption.columns"
        :data="tableOption.data"
      ></Table>
    </div>
    <div style="text-align:right">
      <Icon type="ios-bulb-outline"></Icon>
      <span style="color:rgba(0, 0, 0, 0.45)">没有更多数据</span>
    </div>
  </div>
</template>

<script>
import CheckBoxCmp from './menu-checkbox-cmp'
export default {
  props: {
    role: Object
  },
  components: {},
  mixins: [],
  data() {
    return {
      loading: false,
      authMenusIds: [],
      tableOption: {
        columns: [
          {
            width: 60,
            align: 'center',
            render: (h, params) => {
              const row = params.row
              return (
                <CheckBoxCmp
                  menu={row}
                  roleId={this.role.id}
                  checked={this.$_.includes(this.authMenusIds, row.id)}
                ></CheckBoxCmp>
              )
            }
          },
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
          }
        ],
        data: []
      }
    }
  },
  computed: {},
  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.loading = true
      try {
        await this.queryMenusIdsByRole()
        await this.queryDatas()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 数据查询
    queryDatas() {
      this.$http.get('/api-gdss/upms/menu/get/tree/menus').then(res => {
        const { status, data } = res
        if (status === 200 && data.isOk) {
          this.tableOption.data = data.data || []
        }
      })
    },
    // 查询已经分配的菜单
    queryMenusIdsByRole() {
      if (this.role.id) {
        this.$http
          .get('/api-gdss/upms/reMenuRole/list/by/role', { roleId: this.role.id })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.authMenusIds = data.data || {}
            }
          })
      }
    }
  }
}
</script>

<style scoped></style>
