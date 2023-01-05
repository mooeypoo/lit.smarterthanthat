export const state = () => ({
  post: null
})

export const mutations = {
  setPost (state, post) {
    state.post = post
  },
  unsetPost (state) {
    state.post = null
  }
}
