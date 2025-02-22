import axios from '@/plugins/axios'
import { Message } from 'view-design'
// import store from '@/store'
// import router from '@/router'
// import _ from 'lodash'
import FileDownLoad from 'js-file-download'
// const HttpErrorCode = {
//   400: '请求错误',
//   // 提示用户授权时间过期，请登录
//   401: '未授权，请登陆',
//   // 跳转到 未授权页面
//   403: '拒绝访问',
//   // 跳转到错误页面
//   404: '请求地址出错',
//   // 提示请稍后再试
//   408: '请求超时',
//   // 跳转到服务器正在修正中
//   500: '服务器内部错误',
//   // 跳转到正在开发中页面
//   501: '服务未实现',
//   // 跳转到请联系维护人员页面
//   502: '网关错误',
//   // 跳转到服务修正页面中
//   503: '服务不可用',
//   // 跳转到系统维护页面
//   504: '网关超时',
//   // 跳转到不支持此功能
//   505: 'HTTP版本不受支持'
// }

export default {
  get: (url, params = {}) => {
    return axios
      .request({
        url: url,
        params,
        method: 'get'
      })
  },
  uploadFile: (url, data) => {
    const options = {
      url: url,
      data,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-URL-PATH': location.pathname
      }
    }
    return axios
      .request(options)
  },
  /**
   * 下载文件
   * @param {*} url
   * @param {*} params
   */
  async downLoadFile (url, options, fileName) {
    const _options = Object.assign(
      {},
      {
        url: url,
        method: 'post',
        responseType: 'blob'
      },
      options
    )

    const res = await axios.request(_options)
    const resBlob = res.data // <--- store the blob if it is
    let resData = null
    try {
      const resText = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('abort', reject)
        reader.addEventListener('error', reject)
        reader.addEventListener('loadend', () => {
          resolve(reader.result)
        })
        reader.readAsText(resBlob)
      })
      resData = JSON.parse(resText) // <--- try to parse as json evantually
    } catch (err) {
      // ignore
    }
    // Now you have `resData` and `resBlob` at the same time.
    // `resData` would be the normal data object,
    // or the error object if `resBlob` is expected.
    if (resData) {
      Message.error({
        content: resData.msg,
        duration: 5
      })
    } else {
      // handle blob
      FileDownLoad(resBlob, `${fileName}`)
    }
  },
  post: (url, data, options = {}) => {
    const _options = Object.assign({}, options, {
      url: url,
      data,
      method: 'post'
    })
    return axios
      .request(_options)
  },
  delete: (url, params) => {
    return axios
      .request({
        url: url,
        params,
        method: 'delete'
      })
  },
  put: (url, data, hasParams = false) => {
    const options = {
      url: url,
      data,
      method: 'put'
    }
    if (hasParams) {
      options.params = data
    }
    return axios
      .request(options)
  }
}
