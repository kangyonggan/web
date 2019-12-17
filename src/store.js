import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // 全局变量
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    // get变量
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    // set变量
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    // 异步操作
    actions: {}
});