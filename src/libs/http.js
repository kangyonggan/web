import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';

// 60s超时
axios.defaults.timeout = 60000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['x-auth-token'] = localStorage.getItem('token');

    if (config.data && config.type !== 'upload') {
        config.data = qs.stringify(config.data, {
            // 解决数组传递问题
            indices: false
        });
    }

    return config;
}, function (error) {
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.config.baseURL === '/bzone/') {
        if (response.data.success) {
            return response.data.data;
        } else {
            return Promise.reject(response.data);
        }
    } else {
        if (response.data.respCo === '0000') {
            const token = response.headers['x-auth-token'];
            if (token) {
                localStorage.setItem('token', token);
            }
            return response.data.data;
        } else {
            return Promise.reject(response.data);
        }
    }
}, function (error) {
    if (!error.isAxiosError) {
        return Promise.reject(error);
    }
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

Vue.use(VueAxios, axios);

export default axios;