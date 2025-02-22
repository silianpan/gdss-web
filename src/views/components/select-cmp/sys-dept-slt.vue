<template>
  <Select
    @input="handleInput"
    :multiple="multiple"
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
    </Option>
  </Select>
</template>

<script>
import Mixin from './mixin'
export default {
  mixins: [Mixin],
  props: {
    valueField: {
      type: String,
      default: 'deptId'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    labelField: {
      type: String,
      default: 'deptName'
    }
  },
  data() {
    return {
      selectOptions: []
    }
  },
  methods: {
    async init() {
      this.loading = true
      this.$http
        .get('/api-gdss/upms/dept/all', {})
        .then(res => {
          const { status, data } = res
          if (status === 200 && data.isOk) {
            this.selectOptions = data.data || []
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = true
        })
    }
    // 远程搜索
  }
}
</script>

<style scoped></style>
