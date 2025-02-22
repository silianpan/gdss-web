<template>
  <div style="display:flex;justify-content:center;">
    <Icon
      v-if="loading"
      type="ios-loading"
      size="18"
      class="spin-icon-load"
    ></Icon>
    <Checkbox v-else @on-change="handleChange" v-model="checkBoxVal"></Checkbox>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    routerId: String,
    checked: Boolean,
    roleId: String
  },
  components: {},
  data() {
    return {
      loading: false,
      checkBoxVal: this.checked
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleChange(val) {
      this.loading = true
      if (val) {
        this.$http
          .post('/api-gdss/upms/reVueRouterRole/save', {
            roleId: this.roleId,
            vueRouteId: this.routerId
          })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.$Message.success(data.msg || '授权成功')
            } else {
              this.checkBoxVal = false
              this.$Message.error(data.msg || '操作失败')
            }
            this.loading = false
          })
          .catch(e => {
            this.checkBoxVal = false
            this.loading = false
            this.$Message.error('操作失败')
          })
      } else {
        this.$http
          .post('/api-gdss/upms/reVueRouterRole/delete', {
            roleId: this.roleId,
            vueRouteId: this.routerId
          })
          .then(res => {
            const { status, data } = res
            if (status === 200 && data.isOk) {
              this.$Message.success(data.msg || '取消成功')
            } else {
              this.checkBoxVal = true
              this.$Message.error(data.msg || '操作失败')
            }
            this.loading = false
          })
          .catch(e => {
            this.checkBoxVal = true
            this.$Message.error('操作失败')
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped>
.spin-icon-load {
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
