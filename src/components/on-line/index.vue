<!--
 -->
<template>
<div style="width:100%;height:100%">
  <OfficeOnline :filePath="filePath" :fileName="fileName"> </OfficeOnline>
</div>
</template>

<script>
import OfficeOnline from './office'
export default {
  components: {
    OfficeOnline
  },
  props: {
    filePath: String,
    fileName: String
  },
  data() {
    return {}
  },
  methods: {

  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
