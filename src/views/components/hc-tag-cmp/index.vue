<template>
  <div v-if="value && !$_.isEmpty(value)">
    <div v-if="$_.isArray(value)" style="display:flex;flex-wrap:wrap">
      <div v-for="(tag, index) in value" :key="index" class="hc-mr-16">
        <Tag type="border" closable color="primary" @on-close="handleClose(tag)">{{ (label || '') + tagFormat(tag) }}</Tag>
      </div>
    </div>
    <Tag v-else type="border" closable color="primary" @on-close="handleClose(value)">{{ (label || '') + tagFormat(value) }}</Tag>
  </div>
  <div v-else></div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [Array, Object, String],
    tagFormat: {
      type: Function,
      default: v => v
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    handleClose(tag) {
      if (this.$_.isArray(this.value)) {
        const selected = this.$_.remove(this.value, function(n) {
          return n !== tag
        })
        this.$emit('input', selected)
      } else {
        this.$emit('input', null)
      }
      this.$emit('on-click')
    }
  }
}
</script>

<style scoped></style>
