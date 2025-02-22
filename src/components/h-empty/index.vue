<template>
  <div class="h-empty">
    <div class="h-empty-body">
      <icon-svg
        icon-class="error-empty"
        width="180px"
        height="180px"
      ></icon-svg>
      <div class="h-empty-description">
        <p slot="desc" class="desc-content"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.h-empty {
  margin: 0 8px;
  font-size: 14px;
  line-height: 22px;
  // text-align: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  .h-empty-body {
    position: relative;

    .h-empty-description {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .h-empty-description {
    margin: 0;
  }
}
</style>
