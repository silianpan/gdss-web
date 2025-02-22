<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp
      v-model="formDatas.source"
      :items="sourceDatas"
      @on-click="handleSearch"
    ></SelectTagCmp>
    <!-- <div style="height:20px"></div> -->
    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.source"></HcTagCmp>
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
      sourceDatas: [
        '新浪医药新闻',
        'Insight数据库',
        '药渡',
        '动脉网',
        '药明康德',
        '生物谷',
        '医药地理',
        '药智网',
        'CPhI制药在线',
        '医谷',
        '生物探索',
        '环球网',
        '火石创造',
        '米内网',
        '医药魔方',
        '八点健闻',
        '亿欧大健康',
        '医药观察家网'
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
          tableId: 'realtime_info',
          fields: ['source']
        })
        .then(rb => {
          const { status } = rb
          if (status === 200) {
            if (rb.data.isOk === true) {
              this.sourceDatas = (rb.data.data.source || [])
                .filter(d => !this.$_.isEmpty(d.name))
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
