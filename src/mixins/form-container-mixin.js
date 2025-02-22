import CommonUtil from '@/utils/CommonUtil'
export default {
  components: {},
  inject: ['drawer'],
  data() {
    return {
      isBtnLoading: false
    }
  },
  methods: {
    async handleSaveClick() {
      this.isBtnLoading = true
      const targetForms = CommonUtil.findAllComponentDownward(this, 'm-form-')
      let _check = true
      if (!this.$_.isEmpty(targetForms)) {
        let formData = {}
        for (let index = 0; index < targetForms.length; index++) {
          const targetForm = targetForms[index]
          const datas = await targetForm.validate()
          if (datas === false) {
            _check = false
          } else if (!this.$_.isEmpty(datas)) {
            formData = Object.assign(formData, datas)
          }
        }
        if (_check) {
          if (this.saveAction) {
            const r = await this.saveAction(formData)
            if (r === true) {
              if (this.afterSaveAction) {
                await this.afterSaveAction(formData)
              }
              this.close()
            }
          }
        } else {
          this.$Message.error('请检查表单填写的信息')
        }
        this.isBtnLoading = false
      }
    },
    close() {
      this.drawer.hide()
    },
    handleGoBackClick() {
      if (this.beforeBack) {
        const targetForms = CommonUtil.findAllComponentDownward(this, 'm-form-')
        const formData = {}
        if (!this.$_.isEmpty(targetForms)) {
          for (let index = 0; index < targetForms.length; index++) {
            const targetForm = targetForms[index]
            Object.assign(formData, targetForm.getDatas())
          }
        }
        this.beforeBack(formData).then(r => {
          if (r) {
            this.close()
          }
        })
      } else {
        this.close()
      }
    }
  }
}
