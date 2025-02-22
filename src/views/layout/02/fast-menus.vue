<template>
  <div>
    <speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <Button
          size="large"
          v-if="fab"
          type="primary"
          shape="circle"
          icon="md-close"
        ></Button>
        <Button
          v-else
          size="large"
          type="primary"
          shape="circle"
          custom-icon="iconfont icon-menu"
        ></Button>
      </template>
      <div
        style="position:relative;width:100%;"
        v-for="(item, index) in fabBtns"
        :key="index"
      >
        <div
          :style="{
            position: 'absolute',
            right: '50px'
          }"
          class="text-center hc-mr-8 white-text"
        >
          <div class="my-chip" @click="handleClick(item)">
            <span class="my-chip__content"> {{ item[labelField] }}</span>
          </div>
        </div>
        <Button
          @click="handleClick(item)"
          size="small"
          :type="item.btnType || 'info'"
          shape="circle"
          :custom-icon="item[iconField]"
        >
        </Button>
      </div>
    </speed-dial>
  </div>
</template>

<script>
import SpeedDial from '@/components/speed-dial'
export default {
  props: {
    labelField: {
      type: String,
      default: 'label'
    },
    iconField: {
      type: String,
      default: 'icon'
    },
    fabBtns: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SpeedDial
  },
  data() {
    return {
      fab: true
    }
  },
  computed: {
    currentMenu() {
      return this.$store.getters.currentMenu || {}
    }
  },
  mounted() {},
  methods: {
    handleClick(item) {
      this.$emit('on-click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.my-speed-dial {
  &__list .ivu-btn {
    margin: 6px;
  }
  .ivu-btn-large {
    height: 56px;
    width: 56px;
    font-size: 24px !important;
  }
  &__list .ivu-btn-small {
    height: 40px;
    width: 40px;
    font-size: 0.75rem;
  }
}
.my-chip {
  align-items: center;
  cursor: default;
  display: inline-flex;
  line-height: 20px;
  max-width: 100%;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-decoration: none;
  -webkit-transition-duration: 0.28s;
  transition-duration: 0.28s;
  -webkit-transition-property: opacity, -webkit-box-shadow;
  transition-property: opacity, -webkit-box-shadow;
  transition-property: box-shadow, opacity;
  transition-property: box-shadow, opacity, -webkit-box-shadow;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: nowrap;

  cursor: pointer;
  background-color: #03a9f4 !important;
  border-color: #03a9f4 !important;
  border-radius: 16px;
  font-size: 14px;
  height: 32px;
  &__content {
    align-items: center;
    display: inline-flex;
    height: 100%;
    max-height: 100%;
  }
}
.white-text {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
</style>
