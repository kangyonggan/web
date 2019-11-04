import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/',
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: 'article',
                component: (resolve) => require(['./views/article/index.vue'], resolve)
            },
            {
                path: 'article/:id',
                component: (resolve) => require(['./views/article/detail.vue'], resolve)
            },
            {
                path: '*',
                component: (resolve) => require(['./views/404.vue'], resolve)
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true);
    next();
});

router.afterEach(() => {
    store.commit('setLoading', false);
});

export default router;
export {routers};