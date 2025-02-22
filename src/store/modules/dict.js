// import _ from 'lodash'
import Vue from 'vue'
import DictItemApi from '@/api/dict/dict-item'
export default {
  state: {
    dictDatas: {}
  },
  getters: {},

  mutations: {
    /**
     * 设置前端用户基本信息
     * @author hsc
     * @date 2019-12-10
     * @param {*} state
     * @param {*} pyload
     */
    setGroupDictDatas: (state, pyload) => {
      const { groupCode, data } = pyload
      Vue.set(state.dictDatas, groupCode, data)
    }
  },
  actions: {
    /**
     *
     * 根据group code 查询字典数据
     * @author hsc
     * @date 2019-12-11
     * @param {*} { dispatch, commit }
     * @returns
     */
    async queryDictDatasByGroupCode ({ commit }, groupCode) {
      const rb = await DictItemApi.queryDictDatasByGroupCode(groupCode)
      if (rb.isOk === true) {
        // 设置基本信息
        commit('setGroupDictDatas', {
          groupCode: groupCode,
          data: rb.data || []
        })
      }
      return rb.isOk === true
    }
  }
}
