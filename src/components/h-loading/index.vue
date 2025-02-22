<template>
  <div class="h-loading-wrapper animation-l">
    <div class="shape shape1"></div>
    <div class="shape shape2"></div>
    <div class="shape shape3"></div>
    <div class="shape shape4"></div>
  </div>
</template>

<script>
export default {
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
.h-loading-wrapper.animation-l {
  -webkit-animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}
.h-loading-wrapper {
  width: 30px;
  height: 30px;
  position: relative;
  .animation-l {
    .shape {
      width: 10px;
      height: 10px;
      border-radius: 1px;
    }
  }
  .shape {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 1px;
  }
  .shape1 {
    left: 0;
    background-color: #5c6bc0;
  }
  .shape2 {
    right: 0;
    background-color: #8bc34a;
  }
  .shape3 {
    bottom: 0;
    background-color: #ffb74d;
  }
  .shape4 {
    bottom: 0;
    right: 0;
    background-color: #f44336;
  }
}
.animation-l .shape1 {
  -webkit-animation: animation6shape1 2s linear 0s infinite normal;
  animation: animation6shape1 2s linear 0s infinite normal;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}

@keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}
.animation-l .shape2 {
  -webkit-animation: animation6shape2 2s linear 0s infinite normal;
  animation: animation6shape2 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}

@keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}
.animation-l .shape3 {
  -webkit-animation: animation6shape3 2s linear 0s infinite normal;
  animation: animation6shape3 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}

@keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}
.animation-l .shape4 {
  -webkit-animation: animation6shape4 2s linear 0s infinite normal;
  animation: animation6shape4 2s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}
@keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}
</style>
