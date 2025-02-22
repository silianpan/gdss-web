<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp label="服务类型" :multiple="false" :labelFormat="v => v.label" @on-click="throttleSearch()" v-model="formDatas.serviceTypeCodes" :items="serviceTypeCodes"></SelectTagCmp>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp :tagFormat="v => v.label" @on-click="throttleSearch()" v-model="formDatas.serviceTypeCodes"></HcTagCmp>
    </div>
  </div>
</template>
<script>
import HcTagCmp from '@/views/components/hc-tag-cmp'
import SelectTagCmp from '@/views/components/select-tag-cmp'
export default {
  mixins: [],
  components: {
    SelectTagCmp,
    HcTagCmp
  },
  data() {
    return {
      throttleSearch: this.$_.throttle(this.handleSearch, 1000, { trailing: true }),
      formDatas: {
        serviceTypeCodes: {}
      },
      // 时效性
      serviceTypeCodes: [
        {
          label: '评估',
          value: '01'
        },
        {
          label: '法务',
          value: '02'
        },
        {
          label: '咨询',
          value: '03'
        },
        {
          label: '物流',
          value: '04'
        },
        {
          label: '财务',
          value: '05'
        },
        {
          label: '其他',
          value: '06'
        },
        {
          label: '人才',
          value: '07'
        }
      ]
    }
  },
  computed: {
    hasC() {
      let _has = false
      if (this.formDatas) {
        for (const key in this.formDatas) {
          if (this.formDatas[key] && !this.$_.isEmpty(this.formDatas[key])) {
            _has = true
            break
          }
        }
      }
      return _has
    }
  },
  mounted() {},
  methods: {
    init() {},
    reset() {
      this.formDatas = {}
      this.$emit('on-search')
    },
    handleSearch() {
      this.$emit('on-search')
    },
    getDatas() {
      const _datas = Object.assign({}, this.formDatas)
      if (_datas.serviceTypeCodes && !this.$_.isEmpty(_datas.serviceTypeCodes)) {
        _datas.serviceTypeCodes = _datas.serviceTypeCodes.value
      } else {
        _datas.serviceTypeCodes = ''
      }
      return _datas
    }
  }
}
</script>

<style scoped></style>
