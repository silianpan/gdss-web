<template>
  <div @keyup.enter="handleSearch">
    <Form ref="formInline" :model="formDatas" inline :label-width="80">
      <Row>
        <i-col :sm="8">
          <FormItem label="昵称" style="width:100%;">
            <Input v-model="formDatas.nick_name" placeholder="用户昵称" />
          </FormItem>
        </i-col>
        <i-col :sm="8">
          <FormItem label="账号" style="width:100%;">
            <Input v-model="formDatas.user_name" placeholder="登陆账号" />
          </FormItem>
        </i-col>
        <i-col :sm="8">
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
