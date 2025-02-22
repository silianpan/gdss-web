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
      <span class="value" v-html="data[item.field] || ''"></span>
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
        { field: 'product_sn', label: '编号' },
        {
          field: 'business_license_number',
          label: '社会信用代码/组织机构代码'
        },
        { field: 'esp_type', label: '分类码' },
        { field: 'esp_province', label: '省份' },
        { field: 'eps_name', label: '企业名称' },
        { field: 'legal_person', label: '法定代表人' },
        { field: 'business_person', label: '企业负责人' },
        { field: 'quality_person', label: '质量负责人' },
        { field: 'eps_address', label: '注册地址' },
        { field: 'eps_product_address', label: '生产地址' },
        { field: 'cert_str', label: '生产范围' },
        { field: 'xk_date_str', label: '发证日期' },
        { field: 'xk_date', label: '有效期至' },
        { field: 'qf_manager_name', label: '发证机关' },
        { field: 'xk_name', label: '签发人' },
        { field: 'rc_manager_depart_name', label: '日常监管机构' },
        { field: 'rc_manager_user', label: '日常监管人员' },
        { field: 'remark', label: '备注' }
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
