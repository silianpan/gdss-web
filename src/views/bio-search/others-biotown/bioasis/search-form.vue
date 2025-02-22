<template>
  <div @keyup.enter="handleSearch">
    <div class="s-wrapper">
      <SelectTagCmp
        v-model="formDatas.classify_name"
        :items="classifyNameDatas"
        @on-click="handleSearch"
      ></SelectTagCmp>
    </div>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.classify_name" @on-click="handleSearch"></HcTagCmp>
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
      classifyNameDatas: [
        '园区新闻',
        '行业新闻',
        '入驻机构',
        '入驻企业'
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$http
        .post('/api-gdss/search/aggs/groupby', {
          db: 'bio_others',
          tableId: 'bioasis',
          fields: ['classify_name']
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.isOk === true) {
              this.classifyNameDatas = (res.data.data.classify_name || [])
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

<style lang="less" scoped>
.s-wrapper {
  display: flex;
  flex-wrap: wrap;
  .hc-select-tag-wrapper {
    &:not(:last-child) {
      margin-right: 20px;
      // border-right: 5px solid #2d8cf0;
    }
  }
}
</style>
