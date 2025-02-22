<template>
  <Select v-model="value">
    <Option
      style="display:none"
      v-for="item in optionDatas"
      :value="item[valueField]"
      :key="item[valueField]"
      >{{ item[labelField] }}</Option
    >
    <Tree :data="treeDatas" @on-select-change="handleTreeSelect"></Tree>
  </Select>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    valueField: {
      type: String,
      default: 'id'
    },
    labelField: {
      type: String,
      default: 'title'
    },
    filterable: Boolean,
    clearable: Boolean,
    placeholder: String
  },
  components: {},
  data() {
    return {
      model17: '',
      treeDatas: []
    }
  },
  computed: {
    optionDatas() {
      return CommonUtil.treeToHashTable(this.treeDatas)
    }
  },
  mounted() {
    this.getTreeDatas()
  },
  methods: {
    handleTreeSelect(selected, row) {
      console.log(selected, row)
      this.$emit('input', row[this.valueField])
    },
    getTreeDatas() {
      this.$http.get('/api-gdss/upms/vueRoute/get/tree/routers').then(res => {
        const { status, data } = res
        if (status === 200 && data.isOk) {
          this.treeDatas = data.data || []
        }
      })
    }
  }
}
</script>

<style scoped></style>
