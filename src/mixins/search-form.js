export default {
  data() {
    return {
      formDatas: {}
    }
  },
  methods: {
    handleReset() {
      this.formDatas = {}
      this.$emit('on-search')
    },
    handleSearch() {
      this.$emit('on-search')
    },
    getConditions() {
      const _datas = this.getDatas()
      const conditons = []
      for (const key in _datas) {
        if (
          Object.prototype.hasOwnProperty.call(_datas, key) &&
          !this.$_.isEmpty(_datas[key])
        ) {
          const c = {
            field: key,
            value: _datas[key]
          }
          conditons.push(c)
        }
      }
      return conditons
    },
    getDatas() {
      const _datas = Object.assign({}, this.formDatas)
      return _datas
    }
  }
}
