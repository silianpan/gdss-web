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
import CheckBoxCmp from './router-checkbox-cmp'
export default {
  props: {
    role: Object
  },
  components: {},
  mixins: [],
  data() {
    return {
      loading: false,
      authRouterIds: [],
      tableOption: {
        columns: [
          {
            width: 60,
            align: 'center',
            render: (h, params) => {
              const row = params.row
              return (
                <CheckBoxCmp
                  routerId={row.id}
                  roleId={this.role.id}
                  checked={this.$_.includes(this.authRouterIds, row.id)}
                ></CheckBoxCmp>
              )
            }
          },
          {
            title: '路由名称',
            key: 'title',
            tree: true
          },
          {
            title: '路径',
            key: 'path'
          },
          {
            title: '重定向',
            key: 'path'
          },
          {
            title: '页面文件',
            key: 'component'
          },
          {
            title: '配置',
            align: 'center',
            width: 80
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
        await this.queryRouterIdsByRole()
        await this.queryDatas()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 数据查询
    queryDatas() {
      this.$http.get('/api-gdss/upms/vueRoute/get/tree/routers').then(res => {
        const { status, data } = res
        if (status === 200 && data.isOk) {
          this.tableOption.data = data.data || []
        }
      })
    },
    // 查询已经分配
    queryRouterIdsByRole() {
      if (this.role.id) {
        this.$http
          .get('/api-gdss/upms/reVueRouterRole/list/by/role', {
            roleId: this.role.id
          })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.authRouterIds = data.data || {}
            }
          })
      }
    }
  }
}
</script>

<style scoped></style>
