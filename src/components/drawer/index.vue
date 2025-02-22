<template>
  <Drawer
    :title="title"
    :width="width"
    :placement="placement"
    :closable="closable"
    v-model="visible"
  >
    <slot></slot>
  </Drawer>
</template>

<script>
export default {
provide() {
  return {
    drawer: this
  }
},
  props: {
    title: String,
    placement: {
      type: String,
      default: 'right'
    },
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: Object,
    styles: Object,
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  data() {
    return {
      visible: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style scoped></style>
