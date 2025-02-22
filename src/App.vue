<template>
  <div id="app">
    <Spin fix large v-if="$store.state.load.loading">
      <h-loading></h-loading>
    </Spin>
    <router-view></router-view>
  </div>
</template>

<script>
import watermark from '@/utils/watermark'
import globalConfig from '@/config/index'
import moment from 'moment'
export default {
  name: 'app',
  created() {},
  mounted() {
    // 添加水印
    if (globalConfig.watermark) {
      setInterval(() => {
        watermark(`${globalConfig.company}<br>${moment().format('YYYY-MM-DD HH:mm:ss')}<br>${this.nickName || ''}`)
      }, 1000)
    }
  },
  computed: {
    // 用户基本信息
    nickName() {
      const nk = localStorage.getItem('nickName')
      return nk === 'undefined' || nk === undefined || nk === null ? '' : nk
    }
  }
}
</script>

<style lang="less">
@import 'http://at.alicdn.com/t/font_2300941_q8yjafwlaii.css';
.water-mark-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}
.water-word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(191, 191, 191, 0.15);
  transform: rotate(-15deg);
  user-select: none;
}
</style>
