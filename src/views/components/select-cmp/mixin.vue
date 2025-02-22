<template>
  <Select
    @input="handleInput"
    :clearable="clearable"
    :filterable="filterable"
    :loading="loading"
    :value="value"
  >
    <Option
      v-for="(option, index) in selectOptions"
      :value="option[valueField]"
      :key="index"
      :label="option[labelField]"
    >
      <span>{{ option[labelField] }}</span>
      <span style="float:right;color:#ccc"></span>
    </Option>
  </Select>
</template>

<script>
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
      default: 'name'
    },
    filterable: Boolean,
    clearable: Boolean,
    placeholder: String
  },
  data() {
    return {
      loading: false,
      selectOptions: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
    // 远程搜索
    async init() {}
  }
}
</script>

<style scoped></style>
