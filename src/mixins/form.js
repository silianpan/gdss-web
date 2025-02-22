export default {
  props: {
    data: Object
  },
  data () {
    return {
      formRef: 'form',
      defaultFormValue: {},
      formDatas: {}
    }
  },
  created () {
    this.formDatas = Object.assign({}, this.defaultFormValue, this.data || {})
  },
  mounted () { },
  methods: {
    resetFields () {
      this.formDatas = Object.assign({}, this.defaultFormValue)
    },
    setDatas (datas) {
      if (!this.$_.isNil(datas) && !this.$_.isEmpty(datas)) {
        this.formDatas = Object.assign({}, datas)
      }
    },
    getFormDatas () {
      return Object.assign({}, this.formDatas)
    },
    getDatas () {
      return Object.assign({}, this.formDatas)
    },
    beforeValidate () {
      return true
    },
    failValidate () { },
    // 提交表单
    validate () {
      return new Promise(resolve => {
        if (this.beforeValidate()) {
          if (!this.$_.isEmpty(this.$refs[this.formRef])) {
            this.$refs[this.formRef].validate(valid => {
              if (valid) {
                resolve(this.getDatas())
              } else {
                resolve(false)
              }
            })
          } else {
            resolve(false)
          }
        } else {
          this.failValidate()
          resolve(false)
        }
      })
    }
  }
}
