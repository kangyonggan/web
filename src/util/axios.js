import axios from 'axios'

// 30s超时
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/api/'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['x-auth-token'] = localStorage.getItem('token');
  if (config.data) {
    config.data._ts = undefined
  }
  return config
}, function (error) {
  return Promise.reject({
    msg: error + ''
  })
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.respCo === '0000') {
    const token = response.headers['x-auth-token'];
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data.data;
  } else {
    return Promise.reject({
      msg: response.data.respMsg,
      code: response.data.respCo
    })
  }
}, function (error) {
  return Promise.reject({
    code: error.response.status,
    msg: error.response.statusText + '(' + error.response.status + ')'
  })
})

export default axios
