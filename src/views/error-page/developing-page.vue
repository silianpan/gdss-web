<template>
  <ErrorPage>
    <icon-svg
      width="260px"
      height="260px"
      icon-class="error-developing"
    ></icon-svg>
    <div class="errorPage-body-con-message">
      功能开发中...
    </div>
  </ErrorPage>
</template>

<script>
import ErrorPage from './index-page'
export default {
  components: {
    ErrorPage
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
