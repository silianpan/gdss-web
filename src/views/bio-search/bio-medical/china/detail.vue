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
        {
          field: 'pz_number',
          label: '批准文号'
        },
        {
          field: 'name',
          label: '产品名称'
        },
        {
          field: 'en_name',
          label: '英文名称'
        },
        {
          field: 'trade_name',
          label: '商品名'
        },
        {
          field: 'agent',
          label: '剂型'
        },
        {
          field: 'norms',
          label: '规格'
        },
        {
          field: 'ssxk_people',
          label: '上市许可持有人'
        },
        {
          field: 'en_name',
          label: '上市许可持有人地址'
        },
        {
          field: 'produce_unit',
          label: '生产单位'
        },
        {
          field: 'pz_date',
          label: '批准日期'
        },
        {
          field: 'produce_address',
          label: '生产地址'
        },
        {
          field: 'cp_type',
          label: '产品类别'
        },
        {
          field: 'ypz_number',
          label: '原批准文号'
        },

        {
          field: 'wb_code',
          label: '药品本位码'
        },

        {
          field: 'wb_code_remark',
          label: '药品本位码备注'
        }
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
