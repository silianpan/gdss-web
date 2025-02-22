<template>
  <div class="fh">
    <!--  -->
    <div class="bg-white hc-pd-16">
      <div>
        <span style="font-weight:600;font-size:20px;line-height:20px;">用户拥有角色</span>
        <p>请选择激活的角色</p>
      </div>
      <div style="overflow:hidden;padding-top:12px;">
        <div style="display:flex;width:100%;">
          <div style="flex:auto"></div>
          <div style="min-width:242px;margin-left:88px;text-align:right;flex:0 1 auto">
            <div style="width: 155px; margin-top: -20px;">
              <img data-v-654f0663 src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" style="width: 100%;" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:600px;margin:0px auto;height:300px;position:relative;top:150px;">
      <Row type="flex" class="hc-mt-16" :gutter="16" justify="center">
        <i-col v-for="(item, index) in roleCodeNames" :key="index">
          <Card style="position:relative;cursor:pointer;width:150px;text-align:center" class="actived" @click.native="handleSelect(item)">
            <div v-if="curRole == item.code" style="position:absolute;top:-14px;left:-6px;">
              <custom-icon type="iconfont icon-ziliaoshouquanguanli-" color="#2d8cf0" size="24"></custom-icon>
            </div>
            <div>{{ item.name }}</div>
          </Card>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    roleCodeNames() {
      return this.$store.getters.roleCodeNames()
    },
    curRole() {
      return this.$store.state.user.curRole
    }
  },
  mounted() {},
  methods: {
    handleSelect(item) {
      if (this.curRole === item.code) {
        this.$Message.info('已激活当前角色')
      } else {
        this.$Modal.confirm({
          title: '确认',
          content: '激活此角色吗？',
          className: 'vertical-center-modal',
          loading: true,
          onOk: () => {
            this.$store.commit('setCurRole', item.code)
            this.$store.dispatch('initAuthResources').then(() => {
              this.$Message.info('已切换角色')
              this.$Modal.remove()
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.actived {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
}
</style>
