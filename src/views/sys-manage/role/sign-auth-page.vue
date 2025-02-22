<template>
  <!-- 分配角色授权页面 -->
  <div>
    <div class="bg-white hc-pd-8">
      <div>
        <span style="font-weight:600;font-size:20px;line-height:20px;">{{ role.name }}</span>
      </div>
      <div class="hc-mt-10">
        <div style="display:flex;width:100%;">
          <div style="flex:auto">
            <div>
              <Tag>{{ role.code }}</Tag>
            </div>
            <div class="hc-mt-10" style="color:#d6d6d6;">{{ role.desc || '暂无描述' }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hc-pd-8">
      <div>
        <Tabs type="card" :animated="false" @on-click="handleTabClick" :value="currentComp">
          <TabPane :name="item.component" :label="item.label" :icon="item.icon" v-for="(item, index) in tabsOption" :key="index"></TabPane>
        </Tabs>
      </div>
      <div>
        <component :role="role" v-bind:is="currentComp"></component>
      </div>
    </div>
  </div>
</template>

<script>
import SignMenuPage from './sign-menu/table-page'
import SignUserTablePage from './sign-user/table-page'
import SignVueRouterPage from './sign-vue-router/table-page'
export default {
  props: {
    role: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    SignMenuPage,
    SignUserTablePage,
    SignVueRouterPage
  },
  data() {
    return {
      currentComp: 'SignUserTablePage',
      tabsOption: [
        {
          component: 'SignUserTablePage',
          label: '用户'
          // icon: ' iconfont icon-zhanghao'
        },
        {
          component: 'SignMenuPage',
          label: '菜单'
          // icon: ' iconfont icon-mokuaiguanli'
        },
        {
          component: 'SignVueRouterPage',
          label: '前端路由'
          // icon: ' iconfont icon-mokuaiguanli'
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleTabClick(name) {
      this.currentComp = name
    }
  }
}
</script>

<style scoped></style>
