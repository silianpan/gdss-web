<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp
      v-model="formDatas.esp_province"
      :items="provinces"
      @on-click="handleSearch"
    ></SelectTagCmp>
    <div style="height:8px"></div>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.esp_province" @on-click="handleSearch"></HcTagCmp>
    </div>
  </div>
</template>
<script>
import HcTagCmp from '@/views/components/hc-tag-cmp'
import SelectTagCmp from '@/views/components/select-tag-cmp'
import provinces from './province'
export default {
  mixins: [],
  components: {
    SelectTagCmp,
    HcTagCmp
  },
  data() {
    return {
      formDatas: {},
      // 规模
      scaleListDatas: ['大型', '中型', '小型', '微型'],
      // 注册地
      provinces: provinces
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
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      this.$http
        .post('/api-gdss/search/aggs/groupby', {
          db: 'bio_policy',
          fields: ['time_valid', 'force_level', 'pub_dept']
        })
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            if (rb.data.isOk === true) {
              this.timeValidDatas = (rb.data.data.time_valid || [])
                .filter(d => !this.$_.isEmpty(d))
                .map(d => d.name)
              this.pubDeptDatas = (rb.data.data.pub_dept || [])
                .filter(d => !this.$_.isEmpty(d))
                .map(d => d.name)
              this.forceLevelDatas = (rb.data.data.force_level || [])
                .filter(d => !this.$_.isEmpty(d))
                .map(d => d.name)
            }
          }
        })
    },
    reset() {
      this.formDatas = {}
      this.$emit('on-search')
    },
    handleSearch() {
      this.$emit('on-search')
    },
    getDatas() {
      const _datas = Object.assign({}, this.formDatas)
      return _datas
    }
  }
}
</script>

<style scoped></style>
