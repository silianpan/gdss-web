import Axios from 'axios'
import ViewUI, { Message } from 'view-design'
import * as AxiosLogger from 'axios-logger'
import Config from '@/config'
Axios.defaults.withCredentials = true

class HttpRequest {
  // 请求拦截
  interceptors (instance, options) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        const { noAuth } = options
        if (!noAuth) {
          const authToken = window.$cookies.get(Config.TokenHeader)
          if (authToken) {
            config.headers[Config.TokenHeader] = authToken
          }
        }
        ViewUI.LoadingBar.start()
        return config
      },
      error => {
        // 对请求错误做些什么
        Message.error('加载超时！')
        ViewUI.LoadingBar.finish()
        return Promise.reject(error)
      },
      request => {
        return AxiosLogger.requestLogger(request)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      response => {
        const { headers } = response
        if (headers) {
          const authToken = headers[Config.TokenHeader || 'token']
          if (authToken) {
            // 存放7天
            window.$cookies.set(Config.TokenHeader, authToken, '7d')
          }
        }
        ViewUI.LoadingBar.finish()
        return AxiosLogger.responseLogger(response)
      },
      error => {
        ViewUI.LoadingBar.finish()
        return Promise.resolve(error.response)
      }
    )
  }

  // 创建实例
  create (options) {
    const conf = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      },
      withCredentials: true
    }
    return Object.assign(conf, options)
  }

  // 请求实例
  request (options) {
    options = this.create(options)
    this.interceptors(Axios, options)
    return Axios(options)
  }
}
export default HttpRequest
