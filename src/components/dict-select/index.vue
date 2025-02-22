<template>
  <Select
    :disabled="disabled"
    :label="label"
    :placeholder="placeholder"
    filterable
    :value="value"
    :transfer="transfer"
    @input="handleInput"
    style="width:100%"
  >
    <Option
      v-for="(item, index) in dictDatas"
      :value="item.value"
      :key="index"
      >{{ item.name }}</Option
    >
  </Select>
</template>

<script>
export default {
  components: {},
  props: {
    value: [Object, String],
    label: String,
    groupCode: String,
    transfer: Boolean,
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    placeholder: String
  },
  data() {
    return {}
  },
  watch: {
    groupCode() {
      console.log(this.groupCode)
      this.queryDictDatas()
    }
  },
  computed: {
    dictDatas() {
      if (this.groupCode && !this.$_.isEmpty(this.groupCode)) {
        console.log(this.$store.state.dict.dictDatas)
        return this.$store.state.dict.dictDatas[this.groupCode] || []
      }
      return []
    }
  },
  mounted() {
    this.queryDictDatas()
  },
  methods: {
    queryDictDatas() {
      if (this.groupCode && !this.$_.isEmpty(this.groupCode)) {
        this.$store.dispatch('queryDictDatasByGroupCode', this.groupCode)
      }
    },
    handleInput(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped></style>
