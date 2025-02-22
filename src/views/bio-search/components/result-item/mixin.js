import CommonUtil from '@/utils/CommonUtil'
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleView() {
      const { extName, path, title } = this.item
      const officeExtNames = [
        'doc',
        'docx',
        'xlsx',
        'xls',
        'ppt',
        'pptx',
        'pdf'
      ]
      const _ext = (extName || '').toLowerCase()
      if (this.$_.includes(officeExtNames, _ext)) {
        CommonUtil.onlinePdf({
          filePath: path,
          fileName: title
        })
      } else {
        CommonUtil.downloadFile(path)
      }
    }
  }
}
