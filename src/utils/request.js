import store from '@/store'
import axios from 'axios'

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器：请求做些事情
// config是每一次请求的配置对象
// 必须返回config
request.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 在发送请求之前做些什么
    // 登录了，所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token} `
    }
    return config // 必须返回config
  },
  function () {}
)
export default request
