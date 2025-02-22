<!--
 -->
<template>
  <div style="width:100%;height:100%">
    <Spin v-if="loading" fix large></Spin>
    <iframe
      @load="handleIframeOnLoad"
      :src="fileSrc"
      width="100%"
      height="100%"
      frameborder="0"
    >
    </iframe>
  </div>
</template>

<script>
import Config from '@/config'
// import Qs from 'qs'
export default {
  props: {
    filePath: String,
    fileName: String
  },
  components: {},
  data() {
    return {
      loading: false,
      format: ['xlxs', 'xlx', 'doc', 'docx', 'ppt', 'pptx']
    }
  },
  methods: {
    handleIframeOnLoad() {
      this.loading = false
    }
  },
  mounted: function() {
    this.loading = true
  },
  computed: {
    fileSrc() {
      const serverPath = `http://${window.location.hostname}/api/fileblocks/formal/${this.filePath}`
      return `${Config.OfficeWebAppServer}${serverPath}`
    }
  }
}
</script>

<style scoped></style>
