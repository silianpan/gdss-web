<template>
  <div class="detail-wrapper">
    <div
      :class="{
        'hc-pd-8': true,
        odd: index % 2 === 0
      }"
      v-for="(item, index) in fields"
      :key="index"
    >
      <span class="hc-mr-8">{{ item.label }}:</span>
      <span class="value">{{ data[item.field] || '' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  components: {},
  data() {
    return {
      fields: [
        { field: 'cert_no', label: '注册证编号' },
        { field: 'cert_name', label: '注册人名称' },
        { field: 'cert_address', label: '注册人住所' },
        { field: 'product_address', label: '生产地址' },
        { field: 'name', label: '产品名称' },
        { field: 'manage_type', label: '管理类别' },
        { field: 'norms', label: '型号规格' },
        { field: 'zu_cheng', label: '结构及组成/主要组成成分' },
        { field: 'syfw', label: '适用范围/预期用途' },
        { field: 'store_condition', label: '产品储存条件及有效期' },
        { field: 'attachment', label: '附件' },
        { field: 'other_content', label: '其他内容' },
        { field: 'remark', label: '备注' },
        { field: 'sp_dept', label: '审批部门' },
        { field: 'pz_date', label: '批准日期' },
        { field: 'validate_date', label: '有效期至' },
        { field: 'change_info', label: '变更情况' }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.detail-wrapper {
  padding: 16px;
  position: relative;
  .odd {
    background-color: #ebf0fa;
  }
  .value {
    color: #0042a2 !important;
  }
}
</style>
