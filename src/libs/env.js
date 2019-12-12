import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/api/';
env.socketUrl = 'wss://' + window.location.hostname + '/api/';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/';
    env.socketUrl = 'ws://localhost:8080/';
} else if (process.env.NODE_ENV === 'hd') {
    axios.defaults.baseURL = 'https://kangyonggan.com/api/';
    env.socketUrl = 'wss://kangyonggan.com/api/';
}

export default env;
Vue.prototype.env = env;



