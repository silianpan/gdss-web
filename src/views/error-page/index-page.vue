<template>
  <div class="errorPage">
    <div class="errorPage-body-con">
      <Card>
        <slot>
          <div class="errorPage-body-con-title ">
            <span class="errorPage-key-span">
              {{ errorCode[0] }}
            </span>
            <span class="errorPage-0-span"> </span>
            <span class="errorPage-key-span">
              {{ errorCode[1] }}
            </span>
          </div>
          <p class="errorPage-body-con-message">{{ $route.params.msg }}</p>
        </slot>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'errorPage',
  props: {},
  data() {
    return {}
  },
  computed: {
    errorCode() {
      if (this.$route.params.code && this.$route.params.code.length > 2) {
        return [this.$route.params.code[0], this.$route.params.code[2]]
      }
      return [4, 4]
    }
  },
  methods: {}
}
</script>

<style lang="less">
@import './error.less';
</style>
