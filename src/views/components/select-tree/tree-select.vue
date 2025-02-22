<!--
//树状级联选择组件，支持，单选，多选，中文、拼音全拼、拼音首字母筛选，选择任意一级
1.调用方式
<treeSelect v-model="value" :data="data" size="small" :width="200" multiple disabled/>
2.参数说明
    2.1 data 数据源，格式如下：
        [
            {
                value: '001',
                label: '北京',
                children: [
                    {
                        value: '0011',
                        label: '故宫',
                        disable: true
                    },
                    {
                        value: '0012',
                        label: '天坛'
                    }
                ]
            }
        ]
    2.2 v-model 初始化选中的项，类型为数组，如果不想设置初始化选中的项，请传递一个空数组
    2.3 size 就是iview定义的size，用于设置组件尺寸，不传使用默认尺寸，可选large，small
    2.4 multiple 是否多选
    2.5 width 文本框宽度，类型为数字，不传默认100%
    2.6 disabled 是否可以选择
    2.7 maxHeight 选择面板的最大高度，类型为数字，默认400，超出时出现滚动条
    2.8 maxWidth 选择面板的最大宽度，类型为数字，默认400，超出时出现滚动条
    2.9 renderOptions 是否渲染下拉选项，默认true
    2.10 parentNodeAllow 父节点是否可以选择，默认true
3.方法说明
    3.1 getSelectNodes 获取被选中的节点对象
4.事件说明
    4.1 click 点击事件，参数true或者false，代表显示或者隐藏下拉框
-->
<template>
  <div class="treeSelect" :style="{ width: width ? width + 'px' : '100%' }">
    <Input
      style="cursor: pointer;"
      :size="size"
      :value="name.join(' | ')"
      :title="name.join(' | ')"
      readonly
      :disabled="disabled"
      @click.native.stop="showBox"
      @mouseover.native="mouseoverHandler"
      @mouseout.native="mouseoutHandler"
      placeholder="请选择"
    >
      <template v-if="!disabled">
        <Icon v-if="!showDelIcon" :type="show ? 'ios-arrow-up' : 'ios-arrow-down'" slot="suffix" />
        <Icon v-if="showDelIcon" type="ios-close-circle" slot="suffix" @click.native="del" title="" />
      </template>
    </Input>
    <div class="wrap treeSelect-wrap" v-show="treeData.length && show" v-if="renderOptions" @click.stop="">
      <Input placeholder="支持中文、拼音搜索" :size="size" v-model="keyWord">
        <Icon v-show="keyWord.length" type="ios-close-circle" slot="suffix" @click.native="clearKeyword" />
      </Input>
      <div class="board" v-if="keyWord.length === 0" :style="{ maxHeight: maxHeight + 'px', maxWidth: maxWidth + 'px' }">
        <treeNode
          v-for="(item, index) in treeData"
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
      <div class="board" v-else :style="{ maxHeight: maxHeight + 'px', maxWidth: maxWidth + 'px' }">
        <treeNode
          v-for="(item, index) in filterData"
          :key="index"
          :treeData="treeData"
          :data="item"
          :size="size"
          :value="value"
          :multiple="multiple"
          :parentNodeAllow="parentNodeAllow"
          :keyWord="keyWord"
        />
        <p v-if="!filterData.length" style="text-align: center;color: #ccc;">无匹配数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import treeNode from './tree-node.vue'
import convert from './convert.js'

const getTarget = (data, key) => {
  var result = []
  var loop = function(data) {
    data.forEach(item => {
      if (
        item.label &&
        !item.disable &&
        (item.label.toLowerCase().indexOf(key) > -1 || item.code.indexOf(key) > -1 || item.firstLetter.toLowerCase().indexOf(key) > -1) &&
        (!item.children || !item.children.length)
      ) {
        result.push(item)
      }
      if (item.children && item.children.length) {
        loop(item.children)
      }
    })
  }
  loop(data)
  return result
}
const filterByKey = (data, target) => {
  const newNodes = []
  data.forEach(item => {
    if (target.includes(item.label)) {
      newNodes.push(item)
    }
    if (item.children && item.children.length) {
      const filtersMenus = filterByKey(item.children, target)
      if (filtersMenus.length) {
        item.children = filtersMenus
        newNodes.push({ ...item, expand: true })
      } else {
        item.children = []
      }
    }
  })
  return newNodes
}

export default {
  name: 'TreeSelect',
  data() {
    return {
      keyWord: '',
      filterData: [],
      show: false,
      showDelIcon: false,
      flattenData: [],
      treeData: [],
      timer: null
    }
  },
  mounted() {
    // $(document).click(() => {
    //   this.show = false
    // })
    // 如果没有开启多选模式，传入的选中的数组元素大于1个，抛入错误
    if (!this.multiple && this.value.length > 1) {
      throw new Error('请开启多选模式')
    }
    // 把改组件实例加入全局变量,方便全部关闭
    if (window.treeSelectArr && window.treeSelectArr.length) {
      window.treeSelectArr.push(this)
    } else {
      window.treeSelectArr = [this]
    }
  },
  methods: {
    showBox() {
      // 先关闭其他的treeSelect下拉树
      window.treeSelectArr.forEach(item => {
        item !== this && (item.show = false)
      })
      if (!this.disabled) {
        this.show = !this.show
        this.$emit('click', this.show)
      }
    },
    mouseoverHandler() {
      if (this.value.length) {
        this.showDelIcon = true
      }
    },
    mouseoutHandler() {
      this.showDelIcon = false
    },
    del() {
      this.value.splice(0, this.value.length)
    },
    clearKeyword() {
      this.keyWord = ''
    },
    getName(data, value) {
      const target = data.find(item => item.value === value)
      return target ? target.label : ''
    },
    check(item) {
      const value = item.value
      const index = this.value.indexOf(value)
      if (index > -1) {
        this.value.splice(index, 1)
      } else {
        !this.multiple && this.value.splice(0, this.value.length)
        this.value.push(value)
      }
    },
    processData(data) {
      this.loading = true
      const startTime = Date.now()
      const flattenData = []
      const treeData = []
      const loop = ({ result, data, label, value }) => {
        data.forEach(item => {
          item.code = item.codeKind === 'dic_df' ? item.code : convert(item.label).allPy
          item.firstLetter = item.codeKind === 'dic_df' ? item.firstLetter : convert(item.label).firstPy
          item._label = label ? label + '/' + item.label : item.label
          item._value = value ? value + '/' + item.value : item.value
          flattenData.push(item)

          const obj = {}
          for (const k in item) {
            if (k !== 'children') {
              obj[k] = item[k]
            }
          }
          result.push(obj)

          if (item.children && item.children.length) {
            obj.children = []
            loop({ result: obj.children, data: item.children, label: item._label, value: item._value })
          }
        })
      }
      loop({ result: treeData, data })
      const endTime = Date.now()
      console.log(endTime - startTime)
      if (treeData.length === 1) {
        treeData[0].expand = true
      }
      return {
        flattenData,
        treeData
      }
    },
    getSelectNodes() {
      return this.flattenData.filter(item => this.value.includes(item.value))
    }
  },
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'id'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 400
    },
    maxWidth: {
      type: Number,
      default: 400
    },
    renderOptions: {
      type: Boolean,
      default: true
    },
    parentNodeAllow: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    data: {
      handler(newVal) {
        const { flattenData, treeData } = this.processData(newVal)
        this.flattenData = flattenData
        this.treeData = treeData
      },
      immediate: true,
      deep: true
    },
    keyWord(newVal) {
      let keyWord = newVal.trim()
      if (keyWord.length > 0) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          keyWord = keyWord.toLowerCase()
          const data = JSON.parse(JSON.stringify(this.treeData))
          const target = getTarget(data, keyWord).map(item => item.label)
          this.filterData = filterByKey(data, target)
        }, 100)
      }
    }
  },
  components: {
    treeNode
  },
  computed: {
    name() {
      return this.value.map(item => {
        return this.getName(this.flattenData, item)
      })
    }
    /* renderData() {
            return this.keyWord.length ? this.filterData : this.treeData;
        } */
  }
}
</script>
<style scoped lang="less">
.treeSelect {
  position: relative;
  .wrap {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 32px;
    width: 100%;
    z-index: 100;
    box-sizing: border-box;
    background: #fff;
    padding: 0 10px 5px 10px;
    width: auto;
    white-space: nowrap;
    overflow: visible;
    border-radius: 3px;
    .board {
      //max-height: 250px;
      //max-width: 500px;
      overflow: auto;
      padding-right: 10px;
      & > .treeNode {
        padding-left: 0;
      }
    }
    .filterData {
      //max-height: 250px;
      //max-width: 500px;
      padding-right: 10px;
      overflow: auto;
    }
  }
}
</style>
<style>
.filterData .ivu-checkbox-wrapper {
  margin-right: 3px !important;
}
.treeSelect .ivu-form-item-content {
  line-height: 20px !important;
}
.treeSelect .ivu-input {
  background: transparent !important;
}
.board::-webkit-scrollbar,
.filterData::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ccc;
}
.board::-webkit-scrollbar-thumb,
.filterData::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ccc;
}
.board::-webkit-scrollbar-track,
.filterData::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #eee;
}
.treeSelect-wrap .ivu-form-item-error {
  border: 1px solid #dcdee2 !important;
}
</style>
