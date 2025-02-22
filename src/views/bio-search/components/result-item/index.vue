<template>
  <component :is="mapping[item.showType]" :item="item"></component>
</template>

<script>
import FileDisplay from './file-display'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    FileDisplay
  },
  data() {
    return {
      mapping: {
        file: 'FileDisplay'
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
