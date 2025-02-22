<template>
  <svg :style="styles" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'icon-svg',
  props: {
    width: String,
    height: String,
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    styles() {
      return {
        width: this.width || '1em',
        height: this.height || '1em',
        verticalAlign: '-0.15em',
        fill: 'currentColor',
        overflow: 'hidden'
      }
    },
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style>
</style>
