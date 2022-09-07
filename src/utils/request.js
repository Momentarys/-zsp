// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'
// axios.defaults.baseURl = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// export default axios

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

export default request
