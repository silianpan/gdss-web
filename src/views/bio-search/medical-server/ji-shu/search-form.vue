<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp @on-click="throttleSearch()" :multiple="false" v-model="formDatas.productCategoryName1" :items="cateGoryName1s"></SelectTagCmp>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp @on-click="throttleSearch()" v-model="formDatas.productCategoryName1"></HcTagCmp>
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
      formDatas: {},
      // 时效性
      cateGoryName1s: ['药品研发', '医疗器械研发']
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
      return _datas
    }
  }
}
</script>

<style scoped></style>
