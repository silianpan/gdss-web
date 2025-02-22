<template>
  <div @keyup.enter="handleSearch">
    <Form ref="formInline" :model="formDatas" inline :label-width="80">
      <Row>
        <i-col :sm="8">
          <FormItem label="名称" style="width:100%;">
            <Input v-model="formDatas.dept_name" placeholder="部门名称" />
          </FormItem>
        </i-col>
        <i-col :sm="16">
          <div style="text-align:right">
            <Button @click="handleSearch" type="primary">搜索</Button>
            <Button @click="handleReset" class="hc-ml-16">重置</Button>
          </div>
        </i-col>
      </Row>
    </Form>
  </div>
</template>
<script>
import SearchFormMixin from '@/mixins/search-form'
export default {
  mixins: [SearchFormMixin],
  components: {},
  data() {
    return {
      formDatas: {}
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
