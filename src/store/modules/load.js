export default {
  state: {
    loading: true
  },
  mutations: {
    loadStatus (state, flag) {
      state.loading = flag
    }
  }
}
