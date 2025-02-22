<template>
  <div class="hc-select-tag-wrapper" style="display:flex;">
    <div class="hc-mr-16" :style="styles" v-if="label">
      {{ label }}
    </div>
    <div style="flex:auto;display:flex;flex-wrap:wrap" class="hc-tag-wrap">
      <div
        v-for="(tag, index) in items"
        :key="index"
        @click="handleClick(tag)"
        :class="{
          'hc-tag': true,
          'hc-mb-8': true,
          'hc-tag-primary': true,
          'hc-tag-checked': isCheck(tag)
        }"
      >
        <span class="hc-tag-text">{{ labelFormat(tag) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 80
    },
    value: [Object, Array, String, Number],
    // 显示字段
    labelFormat: {
      type: Function,
      default: val => val
    },
    items: Array,
    label: String,
    multiple: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    styles() {
      return {
        width: `${this.width}px`,
        'flex-shrink': 0,
        padding: '4px 0px',
        'line-height': '25px'
      }
    }
  },
  mounted() {},
  methods: {
    isCheck(val) {
      if (this.value) {
        if (this.$_.isArray(this.value)) {
          return this.$_.includes(this.value, val)
        }
        return this.value === val
      }
      return false
    },
    itemLabel(item) {
      if (this.$_.isObject(item)) {
        return item[this.itemLabelField]
      }
      return item
    },
    handleClick(tag) {
      if (this.isCheck(tag)) {
        if (this.multiple) {
          const selected = this.$_.remove(this.value, function(n) {
            return n !== tag
          })
          this.$emit('input', selected)
        } else {
          this.$emit('input', null)
        }
      } else {
        if (this.multiple) {
          const selected = [...(this.value || [])]
          selected.push(tag)
          this.$emit('input', selected)
        } else {
          this.$emit('input', tag)
        }
      }
      this.$emit('on-click', tag)
    }
  }
}
</script>

<style lang="less" scoped>
.hc-select-tag-wrapper {
  .hc-tag {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
