<template>
  <Dropdown class="header-user" @on-click="handleClick" transfer>
    <Avatar
      v-if="$_.isEmpty(userInfo.avatar)"
      style="background-color: #87d068"
      icon="ios-person"
    />
    <Avatar v-else :src="userInfo.avatar" />
    {{ userInfo.nickName }}
    <!-- <span v-if="userInfo.deptInfo">({{ userInfo.deptInfo.deptName }})</span> -->
    <!-- <Icon :size="18" type="md-arrow-dropdown"></Icon> -->
    <DropdownMenu slot="list">
      <DropdownItem
        v-for="(item, index) in dropdowmItems"
        :divided="item.divided"
        :key="index"
        :name="item.name"
        >{{ item.label }}</DropdownItem
      >
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import UserModifyPwdForm from '@/views/sys-manage/user/components/modify-pwd-form'
import ActionFormContainer from '@/components/form-container/action-form-container'
export default {
  components: {
    // UserModifyPwdForm
  },
  props: {
    userInfo: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      dropdowmItems: [
        {
          name: 'modifyPwd',
          label: '修改密码'
        },
        {
          name: 'logout',
          divided: true,
          label: '退出登录'
        }
      ]
    }
  },
  methods: {
    async handleSavePwdClick(formDatas) {
      console.log(formDatas)
      if (formDatas !== false) {
        // const res = await UserApi.editPwd(formDatas)
        try {
          const res = await this.$http.post(
            '/api-gdss/upms/user/modify/pwd',
            formDatas
          )
          const { status, data } = res
          if (status === 200 && data.isOk) {
            return true
          } else {
            this.$Message.error(data.msg || '操作失败')
          }
        } catch (error) {
          this.$Message.error('操作失败')
        }
        return false
      }
    },
    /** 修改密码 */
    modifyPwd() {
      const drawer = this.$ddr.create(
        {
          title: '修改密码',
          maskClosable: false,
          width: 500,
          render: (
            <ActionFormContainer saveAction={this.handleSavePwdClick}>
              <div style="background:#f0f0f0">
                <UserModifyPwdForm></UserModifyPwdForm>
              </div>
            </ActionFormContainer>
          )
        },
        this
      )
      drawer.show()
    },
    /** 退出登录 */
    logout() {
      this.$Modal.confirm({
        title: '退出确认',
        content: '您确认退出系统吗？',
        className: 'vertical-center-modal',
        loading: true,
        onOk: () => {
          this.$store.dispatch('logout').then(() => {
            this.$Modal.remove()
            this.$Message.success('退出登录')
            this.$router.push({
              name: 'login'
            })
          })
        }
      })
    },
    handleClick(name) {
      if (this[name] && this.$_.isFunction(this[name])) {
        this[name]()
      }
    }
  }
}
</script>
<style lang="less">
.header-user {
  width: 100%;
  height: 64px;
  line-height: 64px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
