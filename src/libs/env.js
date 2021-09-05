import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/api/';
env.socketUrl = 'wss://' + window.location.hostname + '/api/binance';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/';
    env.socketUrl = 'ws://localhost:8080/binance';
} else if (process.env.NODE_ENV === 'hd') {
    axios.defaults.baseURL = 'https://kangyonggan.com/api/';
    env.socketUrl = 'wss://kangyonggan.com/api/binance';
}

export default env;
Vue.prototype.env = env;



