import { Drawer } from 'view-design'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import _ from 'lodash'
export default {
  create: (props, vNode) => {
    const { title, width, transfer, render, closable, maskClosable, onClose } = props
    const Instance = new Vue({
      name: 'dynamic-drawer',
      store: (vNode || {}).$store || store,
      router: (vNode || {}).$router || router,
      render: function (h) {
        return (
          <Drawer
            title={title}
            width={width}
            closable={closable}
            maskClosable={maskClosable}
            v-model={this.visible}
            onon-close={this._handleClose}
            onon-visible-change={this._handleVisibleChange}
          >
            {render}
          </Drawer>
        )
      },
      provide () {
        return {
          drawer: this
        }
      },
      data () {
        return {
          visible: false
        }
      },
      methods: {
        _handleClose (visible) {
          if (visible === false) {
            this.destory()
          }
        },
        _handleVisibleChange (visible) {
          if (visible === false) {
            this.destory()
          }
        },
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
        },
        destory () {
          if (onClose && _.isFunction(onClose)) {
            onClose()
          }
          setTimeout(() => {
            if (!_.isNil(this.$el)) {
              this.$destroy()
              if (vNode && vNode.$el && transfer !== true) {
                vNode.$el.removeChild(this.$el)
              } else {
                document.body.removeChild(this.$el)
              }
            }
          }, 2000)
        }
      }
    })
    const component = Instance.$mount()
    if (vNode && vNode.$el && transfer !== true) {
      vNode.$el.appendChild(component.$el)
    } else {
      document.body.appendChild(component.$el)
    }
    return {
      /** 显示 弹出框 */
      show: () => {
        component.show()
      },
      /** 移除 */
      destory () {
        component.destory()
      },
      /** 当前的 modal */
      component: component
    }
  }
}
