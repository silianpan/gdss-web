<template>
  <div @keyup.enter="handleSearch">
    <div class="s-wrapper">
      <SelectTagCmp
        v-model="formDatas.time_valid"
        :items="yaoPinTypes"
      ></SelectTagCmp>
    </div>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.time_valid"></HcTagCmp>
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
      formDatas: {},
      // 时效性
      yaoPinTypes: ['国产药品', '进口药品']
      // 发布部门
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
          if (rb.isOk === true) {
            this.timeValidDatas = (rb.data.time_valid || [])
              .filter(d => !this.$_.isEmpty(d))
              .map(d => d.name)
            this.pubDeptDatas = (rb.data.pub_dept || [])
              .filter(d => !this.$_.isEmpty(d))
              .map(d => d.name)
            this.forceLevelDatas = (rb.data.force_level || [])
              .filter(d => !this.$_.isEmpty(d))
              .map(d => d.name)
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

<style lang="less" scoped>
.s-wrapper {
  display: flex;
  flex-wrap: wrap;
  .hc-select-tag-wrapper {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
