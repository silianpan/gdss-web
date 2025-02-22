import _ from 'lodash'
import moment from 'moment'
import Config from '@/config'
export default {
  /**
   *
   * 随机生成uuid
   * @author hsc
   * @date 2019-12-24
   * @returns
   */
  uuid () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  extname (filename) {
    if (!filename || typeof filename !== 'string') {
      return false
    }
    const a = filename
      .split('')
      .reverse()
      .join('')
    const b = a
      .substring(0, a.search(/\./))
      .split('')
      .reverse()
      .join('')
    return b
  },
  firstLeaf (tree) {
    if (!tree && tree.length === 0) {
      return {}
    }
    let leaf = {}
    for (let index = 0; index < tree.length; index++) {
      const element = tree[index]
      if (element.children && element.children.length > 0) {
        const _leaf = this.firstLeaf(element.children)
        leaf = _leaf
        break
      } else {
        leaf = element
        break
      }
    }
    return leaf
  },
  treeToHashTable (tree) {
    if (!tree && tree.length === 0) {
      return []
    }
    let rs = []
    for (let index = 0; index < tree.length; index++) {
      const element = { ...tree[index] }
      rs.push(element)
      if (element.children && element.children.length > 0) {
        const children = this.treeToHashTable(element.children)
        if (children && !_.isEmpty(children)) {
          rs = rs.concat(children)
        }
      }
    }
    return rs
  },
  findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
      componentNames = [componentName]
    } else {
      componentNames = componentName
    }

    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
      parent = parent.$parent
      if (parent) name = parent.$options.name
    }
    return parent
  },

  findAllComponentDownward (context, componentNamePrefix) {
    const childrens = context.$children
    const rs = []
    if (childrens.length) {
      for (const child of childrens) {
        const name = child.$options.name
        if (name && name.startsWith(componentNamePrefix)) {
          rs.push(child)
        } else {
          const crs = this.findAllComponentDownward(child, componentNamePrefix)
          if (!_.isEmpty(crs)) {
            rs.push(...crs)
          }
        }
      }
    }
    return rs
  },
  findOneComponentDownward (context, componentNamePrefix) {
    const childrens = context.$children
    let children = null
    if (childrens.length) {
      for (const child of childrens) {
        const name = child.$options.name
        if (name && name.startsWith(componentNamePrefix)) {
          children = child
          break
        } else {
          children = this.findOneComponentDownward(child, componentNamePrefix)
          if (children) break
        }
      }
    }
    return children
  },

  formatDate (data, fields, format) {
    if (data && !_.isEmpty(fields) && fields.length > 0) {
      for (let index = 0; index < fields.length; index++) {
        const field = fields[index]
        if (moment(data[field]).isValid()) {
          data[field] = moment(data[field]).format(format || 'YYYY-MM-DD')
        }
      }
    }
    return data
  },

  /** pdf 在线预览 */
  onlinePdf (data) {
    let url = ''
    const { filePath, fileName } = data
    if (!_.isNil(filePath) && !_.isEmpty(filePath)) {
      url = `${Config.ServerApiPrefix}/file/upload/preview/file?name=${fileName}&path=${filePath}`
    }
    const href = `${Config.ServerApiPrefix
      }/pdf/web/viewer.html?file=${encodeURIComponent(url)}`

    window.open(href, '_blank')
  },

  /** 下载静态文件 */
  downloadFile (filePath) {
    const href = `${Config.ServerApiPrefix}/fileblocks/${filePath}`
    window.open(href, '_blank')
  },

  /** 图片预览地址 */
  imagePreviewUrl (filePath) {
    return `${Config.ServerApiPrefix}/fileblocks/${filePath}`
  },
  /** 格式化json */
  parseJson (str, d = {}) {
    let r
    try {
      r = JSON.parse(str)
    } catch (error) {
      r = d
    }
    return r
  },
  parseFields (data, fields) {
    fields.forEach((key) => {
      if (data[key] && !_.isEmpty(data[key]) && _.isString(data[key])) {
        try {
          data[key] = JSON.parse(data[key])
        } catch (error) {
          data[key] = {}
        }
      }
    })
    return data
  },
  stringifyFields (data, fields) {
    fields.forEach((key) => {
      if (_.isEmpty(data[key]) || !_.isString(data[key])) {
        try {
          data[key] = JSON.stringify(data[key] || {})
        } catch (error) {
          data[key] = null
        }
      }
    })

    return data
  }
}
