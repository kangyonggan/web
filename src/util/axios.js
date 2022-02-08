import axios from 'axios'

// 30s超时
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/toolbox-api/'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['env'] = localStorage.getItem('env') || 'DEV'
  if (config.data) {
    config.data._ts = undefined
  }
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (userInfo && userInfo.token) {
    config.headers['Authorization'] = userInfo.token
  }
  return config
}, function (error) {
  return Promise.reject({
    message: error + ''
  })
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.success) {
    return response.data.data
  }
  return Promise.reject({
    msg: response.data.msg,
    code: response.data.code
  })
}, function (error) {
  return Promise.reject({
    code: error.response.status,
    msg: error.response.statusText + '(' + error.response.status + ')'
  })
})

export default axios
