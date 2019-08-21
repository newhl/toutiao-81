import axios from 'axios'
import { Message } from 'element-ui' // 引入message模块
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将后台的地址给到axios的baseUrl

axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // 进行配置的注入
  let userInfo = window.localStorage.getItem('user-info') // 获取用户在本地存的token令牌
  let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
  config.headers.Authorization = `Bearer ${token}` // 直接将token注入到 请求参数中
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理

  let code = error.response ? error.response.status : '' // 获取错误状态码
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数缺失'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear()
      window.location.hash = '#/login'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })

  return new Promise()
})

export default axios
