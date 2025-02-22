<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp
      label="时效性:"
      v-model="formDatas.time_valid"
      :items="timeValidDatas"
      @on-click="handleSearch"
    ></SelectTagCmp>
    <div style="height:8px"></div>
    <SelectTagCmp
      label="发布部门:"
      v-model="formDatas.pub_dept"
      :items="pubDeptDatas"
      @on-click="handleSearch"
    ></SelectTagCmp>
    <div style="height:8px"></div>
    <SelectTagCmp
      label="效力级别:"
      v-model="formDatas.force_level"
      :items="forceLevelDatas"
      @on-click="handleSearch"
    ></SelectTagCmp>
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.time_valid" @on-click="handleSearch"></HcTagCmp>
      <HcTagCmp v-model="formDatas.pub_dept" @on-click="handleSearch"></HcTagCmp>
      <HcTagCmp v-model="formDatas.force_level" @on-click="handleSearch"></HcTagCmp>
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
      timeValidDatas: [
        '现行有效',
        '已失效',
        '已废止',
        '已被修订',
        '征求意见稿'
      ],
      // 发布部门
      pubDeptDatas: [
        '国家药品审评中心（CDE）',
        '国家中医药管理局',
        '国务院',
        '国家发改委',
        '自然资源部',
        '成都市'
      ],
      // 效力级别
      forceLevelDatas: [
        '法律行政法规',
        '部门规范性文件',
        '部门规章',
        '政策解读',
        '地方性法规和规章',
        '指导原则',
        '其他'
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
          db: 'bio_search',
          tableId: 'policy',
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
