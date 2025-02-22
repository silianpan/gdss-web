<template>
  <div class="treeNode">
    <Icon v-if="data.children && data.children.length" style="cursor: pointer;" :type="data.expand ? 'ios-arrow-down' : 'ios-arrow-forward'" @click="expand" />
    <Icon v-else style="width: 12px;"></Icon>
    <Checkbox
      :value="value.includes(data.value)"
      :size="size"
      v-if="(parentNodeAllow && !data.disable) || (!parentNodeAllow && (!data.children || !data.children.length))"
      @click.native.prevent="check"
    ></Checkbox>
    <span v-html="addMarking(data.label)"></span>
    <treeNode
      v-show="data.expand"
      v-for="(item, index) in data.children"
      :key="index"
      :treeData="treeData"
      :data="item"
      :size="size"
      :value="value"
      :multiple="multiple"
      :parentNodeAllow="parentNodeAllow"
      :keyWord="keyWord"
    />
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: ['data', 'size', 'value', 'multiple', 'parentNodeAllow', 'keyWord', 'treeData'],
  mounted() {},
  methods: {
    expand() {
      if (Object.keys(this.data).includes('expand')) {
        this.data.expand = !this.data.expand
      } else {
        this.$set(this.data, 'expand', !this.data.expand)
      }
    },
    check() {
      const value = this.data.value
      const index = this.value.indexOf(value)
      if (index > -1) {
        this.value.splice(index, 1)
      } else {
        !this.multiple && this.value.splice(0, this.value.length)
        this.value.push(value)
      }
      if (this.multiple) {
        if (index > -1 && this.data.children && this.data.children.length) {
          this.remove(this.data.children)
        } else if (this.data.children && this.data.children.length) {
          this.add(this.data.children)
        }
        const parents = this.data._value.split('/')
        parents.pop()
        if (index > -1) {
          parents.forEach(item => {
            const index = this.value.indexOf(item)
            if (index > -1) {
              this.value.splice(index, 1)
            }
          })
        } else {
          this.addParents(parents)
        }
      }
    },
    addMarking(html) {
      return this.keyWord ? html.split(this.keyWord).join(`<font color="red">${this.keyWord}</font>`) : html
    },
    addParents(data) {
      while (data.length) {
        const parent = data.pop()
        const parentNode = this.getParentNode(parent)
        if (parentNode.children.every(item => this.value.includes(item.value))) {
          this.value.push(parent)
        }
      }
    },
    getParentNode(value) {
      let res
      ;(function loop(data) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].value === value) {
            res = data[i]
            break
          } else if (!res && data[i].children && data[i].children.length) {
            loop(data[i].children)
          }
        }
      })(this.treeData)
      return res
    },
    remove(data) {
      data.forEach(item => {
        const index = this.value.indexOf(item.value)
        if (index > -1) {
          this.value.splice(index, 1)
        } else {
          this.value.push(item.value)
        }
        if (item.children && item.children.length) {
          this.remove(item.children)
        }
      })
    },
    add(data) {
      data.forEach(item => {
        const index = this.value.indexOf(item.value)
        if (index === -1) {
          this.value.push(item.value)
        }
        if (item.children && item.children.length) {
          this.add(item.children)
        }
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.treeNode {
  padding-left: 18px;
}
</style>
