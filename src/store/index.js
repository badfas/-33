import Vue from 'vue'
import Vuex from 'vuex'
import crearePersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 封装本地存储，vuex-persistedstate

// vuex-persistedstate --> 持久化state

// 1.下载
// - yarn add vuex-persistedstate@3.2.1
// 2.引入
// - import createPersistedState from 'vuex-persistedstate'
// 3.调用
// - plugins: [createPersistedState()]
// 配置项
// key:默认是vuex
// storage:存储的方式，默认是本地存储
// reducer：制定持久化那些数据.函数，return一个对象，对象作为存储的value
// -参数state
export default new Vuex.Store({
  plugins: [
    crearePersistedState({
      key: 'HEIMA_TOUTIAO',
      // storge:winodw.sessioStorage,
      reducer({ tokenObj, myChannels }) {
        return { tokenObj, myChannels }
      }
    })
  ],
  state: {
    tokenObj: {},
    // JSON.parse(window.localStorage.setItem('HEIMATOUTIAO_TOKEn')) || {}
    myChannels: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vex
      state.tokenObj = token
      // token持久化
      // window.localStorage.setItem('HEIMATOUTIAO_TOKEn', JSON.stringify(token))
    },
    /**
     *
     *
     * @param {Array} channels 删除或者添加后的最新的channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  }
})
