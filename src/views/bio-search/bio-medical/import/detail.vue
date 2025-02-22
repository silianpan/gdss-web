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
        { field: 'cert_no', label: '注册证号' },
        { field: 'old_cert_no', label: '原注册证号' },
        { field: 'cert_no_remark', label: '注册证号备注' },
        { field: 'approval_number', label: '分包装批准文号' },
        { field: 'comp_name', label: '公司名称（中文）' },
        { field: 'en_comp_name', label: '公司名称（英文）' },
        { field: 'address', label: '地址（中文）' },
        { field: 'en_address', label: '地址（英文）' },
        { field: 'area', label: '国家/地区（中文）' },
        { field: 'en_area', label: '国家/地区（英文）' },
        { field: 'name', label: '产品名称（中文）' },
        { field: 'en_name', label: '产品名称（英文）' },
        { field: 'trade_name', label: '商品名（中文）' },
        { field: 'en_trade_name', label: '商品名（英文）' },
        { field: 'agent', label: '剂型（中文）' },
        { field: 'norms', label: '规格（中文）' },
        { field: 'package_norms', label: '包装规格（中文）' },
        { field: 'produce_unit', label: '生产厂商（中文）' },
        { field: 'en_produce_unit', label: '生产厂商（英文）' },
        { field: 'produce_unit_address', label: '厂商地址（中文）' },
        { field: 'produce_unit_en_address', label: '厂商地址（英文）' },
        { field: 'produce_unit_area', label: '厂商国家/地区（中文）' },
        { field: 'produce_unit_en_area', label: '厂商国家/地区（英文）' },
        { field: 'issue_date', label: '发证日期' },
        {
          field: 'deadline_date',
          label: '有效期截止日'
        },
        { field: 'fb_qiye_name', label: '分包装企业名称' },
        { field: 'fb_qiye_address', label: '分包装企业地址' },
        { field: 'fb_whpz_date', label: '分包装文号批准日期' },
        { field: 'fb_whjz_date', label: '分包装文号有效期截止日' },
        { field: 'cp_type', label: '产品类别' },
        { field: 'bw_code', label: '药品本位码' },
        { field: 'bw_code_remark', label: '药品本位码备注' }
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
