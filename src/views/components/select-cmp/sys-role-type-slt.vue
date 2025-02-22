<template>
  <Select @input="handleInput" :clearable="clearable" :filterable="filterable" :loading="loading" :value="value">
    <Option v-for="(option, index) in selectOptions" :value="option[valueField]" :key="index" :label="option[labelField]">
      <span>{{ option[labelField] }}</span>
      <span style="float:right;color:#ccc">{{ option[valueField] }}</span>
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
      default: 'type'
    }
  },
  data() {
    return {
      selectOptions: [
        {
          type: 'sys',
          name: '系统角色'
        },
        {
          type: 'bus',
          name: '业务角色'
        }
      ]
    }
  },
  methods: {
    // 远程搜索
  }
}
</script>

<style scoped></style>
