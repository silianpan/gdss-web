import CommonUtil from '@/utils/CommonUtil'
import Vue from 'vue'
import ajax from '@/plugins/ajax/file-upload'
import _ from 'lodash'
import Config from '@/config'
// 最大正在上传文件数量
// const MaxLimitUploadingFiles = 5
// 表单的文件
// 文件上传的状态
const FileUploadStatus = {
  // 排队中
  prepare: {
    status: 'prepare',
    percentage: 0,
    showProgress: false
  },
  // 正在上传中
  uploading: {
    status: 'uploading',
    showProgress: true
  },
  // 成功上传
  success: {
    status: 'success',
    file: null,
    showProgress: false
  },
  // 上传失败
  fail: {
    status: 'fail',
    showProgress: false
  }
}
export default {
  state: {
    // 上传文件存放队列
    uploadFilesQueue: {}
  },
  getters: {
    getFormUploadFileTokens: (state, getters) => formId => {
      return (getters.getUploadFilesByFormId(formId) || [])
        .filter(f => f.status === FileUploadStatus.success.status)
        .map(f => ({ ...f.token }))
    },
    // 获取表单上传文件
    getUploadFilesByFormId: state => formId => {
      return _.filter(
        Object.values(state.uploadFilesQueue) || [],
        f => f.formId === formId
      )
    },
    // 判断表单 文件是否已经上传完毕
    isFormFilesUploaded: (state, getters) => formId => {
      const notUploaded = _.filter(
        getters.getUploadFilesByFormId(formId),
        f => {
          return (
            f.status === FileUploadStatus.prepare.status ||
            f.status === FileUploadStatus.uploading.status
          )
        }
      )
      return _.isEmpty(notUploaded)
    },
    getUploadSuccessFilesCnt: state => {
      const squeue =
        Object.values(state.uploadFilesQueue).filter(
          f => f.status === FileUploadStatus.success.status
        ) || []
      return squeue.length
    }
  },
  mutations: {
    // 开始上传文件时设置 文件上传状态及 开始上传时间
    startUploadFile: (state, uid) => {
      const info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.startTime = new Date().getTime()
        Vue.set(
          state.uploadFilesQueue,
          uid,
          Object.assign({}, info, FileUploadStatus.uploading)
        )
      }
    },
    uploadFileSuccess: (state, { uid, token }) => {
      const info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.endTime = new Date().getTime()
        info.token = token
        Vue.set(
          state.uploadFilesQueue,
          uid,
          Object.assign({}, info, FileUploadStatus.success)
        )
      }
    },
    uploadFileFail: (state, { uid, token }) => {
      const info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.endTime = new Date().getTime()
        info.token = token
        Vue.set(
          state.uploadFilesQueue,
          uid,
          Object.assign({}, info, FileUploadStatus.fail)
        )
      }
    },
    // 将文件加入到上传队列中去
    pushUploadFileQueue: (state, fileInfo) => {
      Vue.set(state.uploadFilesQueue, fileInfo.uid, fileInfo)
      console.log('pushUploadFile... ', state.uploadFilesQueue[fileInfo.uid])
    },
    // 更改文件上传百分比
    changeUploadFilesPercentage: (state, { uid, percentage }) => {
      if (!_.isEmpty(state.uploadFilesQueue[uid])) {
        Vue.set(state.uploadFilesQueue[uid], 'percentage', percentage)
        console.log('changeUploadFilesPercentage... ', uid, percentage)
      }
    }
  },
  actions: {
    // 删除某个表单上传的文件
    async deleteFormUploadfile ({ state }, { formId, uid }) {
      console.log(formId, uid)
      for (const key in state.uploadFilesQueue) {
        const _file = state.uploadFilesQueue[key]
        if (uid && !_.isEmpty(uid)) {
          if (_file.formId === formId && key === uid) {
            Vue.delete(state.uploadFilesQueue, key)
          }
        } else {
          if (_file.formId === formId) {
            Vue.delete(state.uploadFilesQueue, key)
          }
        }
      }
    },
    async deleteUploadfiles ({ state }, accept) {
      for (const key in state.uploadFilesQueue) {
        if (accept && accept(key, state.uploadFilesQueue[key])) {
          Vue.delete(state.uploadFilesQueue, key)
        }
      }
    },

    // 刷新文件队列
    async refreshFilesQueue ({ state, dispatch, commit }) {
      // 如果队列中正在上传的文件数量大于 最大限制 数量 则等待最大数量完成，否则调用上传文件动作
      // let uploadingQueue = []
      // let willUploadQueue = []
      for (const key in state.uploadFilesQueue) {
        const _file = state.uploadFilesQueue[key]
        if (_file.status === FileUploadStatus.prepare.status) {
          commit('startUploadFile', _file.uid)
          dispatch('startUploadFile', _file)
        }
      }
    },

    // 准备上传表单附件
    async prepareUploadFormFile ({ dispatch }, { file, dir, data, action, formId }) {
      await dispatch('prepareUploadFile', { file, dir, data, action, formId })
    },

    // 准备文件上传
    async prepareUploadFile ({ dispatch, commit }, { file, dir, data, action, formId }) {
      if (_.isEmpty(file.uid)) {
        file.uid = CommonUtil.uuid()
      }
      // 封装成对象
      const _file = {
        // 上传状态
        status: FileUploadStatus.prepare.status,
        // 文件名
        name: file.name.replace('.' + CommonUtil.extname(file.name), ''),
        // 扩展名
        extName: CommonUtil.extname(file.name),
        // 大小
        size: file.size,
        // 百分比
        percentage: 0,

        // 所属表单
        formId: formId,

        uid: file.uid,
        // 是否显示进度
        showProgress: true,
        // 请求地址
        action: action,
        // 文件数据
        file: file,
        // 其他数据
        data: data || {},
        // 父级文件夹
        dir: dir || {},
        // 返回数据
        token: {}
      }
      commit('pushUploadFileQueue', _file)
      dispatch('refreshFilesQueue')
    },

    // 开始文件上传
    async startUploadFile ({ dispatch, commit }, fileInfo) {
      const { data, file, uid, action } = fileInfo
      const authToken = window.$cookies.get(Config.TokenHeader)
      ajax({
        headers: {
          [Config.TokenHeader]: authToken
        },
        withCredentials: true,
        file: file,
        data: data,
        filename: 'file',
        action: action,
        onProgress: e => {
          // 更改上传百分比
          commit('changeUploadFilesPercentage', {
            uid,
            percentage: e.percent || 0
          })
        },
        onSuccess: res => {
          const token = res.data
          if (res.isOk) {
            console.log('uploadFileSuccess', uid)
            // 更改状态为成功
            commit('uploadFileSuccess', { uid, token })
          } else {
            // 更改状态为失败
            console.log('uploadFileFail', res)
            commit('uploadFileFail', { uid, token })
          }
          // 刷新队列
          dispatch('refreshFilesQueue')
        },
        onError: (err, response) => {
          const token = {
            msg: '上传失败'
          }
          commit('uploadFileFail', { uid, token })
          console.log('uploadFileFail', err, response, uid)
          dispatch('refreshFilesQueue')
        }
      })
    }
  }
}
