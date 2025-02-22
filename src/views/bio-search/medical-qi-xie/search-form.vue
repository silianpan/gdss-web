<template>
  <div @keyup.enter="handleSearch">
    <SelectTagCmp
      label="分类目录"
      v-model="formDatas.classify"
      :items="classifyDatas"
    ></SelectTagCmp>
    <div style="height:8px"></div>
    <SelectTagCmp
      label="管理类别"
      v-model="formDatas.manage_type"
      :items="manageTypeDatas"
    ></SelectTagCmp>
    <div style="height:8px"></div>
    <SelectTagCmp
      label="文件版本"
      v-model="formDatas.file_version"
      :items="fileVersionDatas"
    ></SelectTagCmp>

    <Divider v-if="hasC" style="margin:8px 0px"></Divider>
    <div style="display:flex;flex-wrap:wrap">
      <HcTagCmp v-model="formDatas.classify"></HcTagCmp>
      <HcTagCmp v-model="formDatas.manage_type"></HcTagCmp>
      <HcTagCmp v-model="formDatas.file_version"></HcTagCmp>
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
      classifyDatas: [
        '有源手术器械',
        '无源手术器械',
        '神经和血管手术器械',
        '骨科手术器械',
        '医用成像器械'
      ],
      manageTypeDatas: [
        'I类',
        'II类',
        'III类',
        '按器械组合管理',
        '批准上市的药械组合产品',
        '不属于药械组合产品',
        '不单独作为医疗器械管理'
      ],
      fileVersionDatas: ['现行', '旧版']
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
          db: 'medical_instrument',
          fields: ['classify', 'manage_type', 'file_version']
        })
        .then(rb => {
          if (rb.isOk === true) {
            this.sourceDatas = (rb.data.source || [])
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

<style scoped></style>
