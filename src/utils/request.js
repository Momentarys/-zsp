// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'

import store from '@/store'
// axios.defaults.baseURl = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// export default axios

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)
export default request
