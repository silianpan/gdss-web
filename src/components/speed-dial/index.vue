<script>
import ClickOutside from '@/directives/click-outside'
export default {
  directives: {
    ClickOutside
  },
  props: {
    value: Boolean,
    mode: String,
    origin: String,
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,
    direction: {
      type: String,
      default: 'top',
      validator: val => {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    openOnHover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },
  components: {},
  data() {
    return {
      isActive: !!this.value
    }
  },
  watch: {
    value(val) {
      this.isActive = !!val
    },
    isActive(val) {
      !!val !== this.value && this.$emit('input', val)
    }
  },
  render(h) {
    let children = []
    const data = {
      class: this.classes,
      directives: [
        {
          name: 'click-outside',
          expression: true,
          value: () => {
            this.isActive = false
            console.log('click-outside')
          }
        }
      ]
    }

    if (this.openOnHover) {
      data.on.mouseenter = () => (this.isActive = true)
      data.on.mouseleave = () => (this.isActive = false)
    }

    if (this.isActive) {
      let btnCount = 0
      children = (this.$slots.default || []).map((b, i) => {
        if (b.tag) {
          btnCount++
          return h(
            'div',
            {
              style: {
                transitionDelay: btnCount * 0.01 + 's'
              },
              key: i
            },
            [b]
          )
        } else {
          b.key = i
          return b
        }
      })
    }

    const list = h(
      'transition-group',
      {
        class: 'my-speed-dial__list',
        props: {
          name: this.transition,
          mode: this.mode,
          origin: this.origin,
          tag: 'div'
        }
      },
      children
    )
    const activator = h(
      'div',
      {
        on: {
          click: () => (this.isActive = !this.isActive)
        }
      },
      this.$slots.activator
    )
    return h('div', data, [activator, list])
  },
  computed: {
    classes() {
      return {
        'my-speed-dial': true,
        'my-speed-dial--top': this.top,
        'my-speed-dial--right': this.right,
        'my-speed-dial--bottom': this.bottom,
        'my-speed-dial--left': this.left,
        'my-speed-dial--absolute': this.absolute,
        'my-speed-dial--fixed': this.fixed,
        [`my-speed-dial--direction-${this.direction}`]: true,
        'my-speed-dial--is-active': this.isActive
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.my-speed-dial {
  position: relative;
  z-index: 1;
  &--top {
    top: 16px;
  }

  &--right {
    right: 16px;
  }

  &--bottom {
    bottom: 16px;
  }

  &--left {
    left: 16px;
  }

  &--fixed {
    position: fixed;
  }

  &--absolute,
  &--fixed {
    z-index: 4;
  }

  &__list {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 16px 0;
    position: absolute;
  }

  &--direction-top &__list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    flex-direction: column-reverse;
    bottom: 100%;
  }

  &--direction-bottom &__list,
  &--direction-top &__list {
    left: 0;
    width: 100%;
  }

  &--direction-bottom &__list {
    flex-direction: column;
    top: 100%;
  }

  &--direction-right &__list {
    flex-direction: row;
    left: 100%;
  }
  &:not(&--is-active) &__list {
    pointer-events: none;
  }
}
</style>
