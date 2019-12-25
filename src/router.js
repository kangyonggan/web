import Vue from 'vue';
import VueRouter from 'vue-router';
import util from './libs/util';

Vue.use(VueRouter);

const routers = [
    {
        path: '/user',
        component: (resolve) => require(['./views/user/layout.vue'], resolve),
        children: [
            {
                path: 'login',
                meta: {
                    title: '登录'
                },
                component: (resolve) => require(['./views/user/login.vue'], resolve)
            },
            {
                path: 'join',
                meta: {
                    title: '注册'
                },
                component: (resolve) => require(['./views/user/join.vue'], resolve)
            },
            {
                path: 'password/reset',
                meta: {
                    title: '找回密码'
                },
                component: (resolve) => require(['./views/user/password-reset.vue'], resolve)
            },
            {
                path: 'success',
                meta: {
                    title: '成功'
                },
                component: (resolve) => require(['./views/user/success.vue'], resolve)
            }
        ]
    },
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
                meta: {
                    title: '文章'
                },
                component: (resolve) => require(['./views/article/index.vue'], resolve)
            },
            {
                path: 'article/:id',
                component: (resolve) => require(['./views/article/detail.vue'], resolve)
            },
            {
                path: 'novel',
                meta: {
                    title: '书籍'
                },
                component: (resolve) => require(['./views/novel/index.vue'], resolve)
            },
            {
                path: 'novel/:id',
                component: (resolve) => require(['./views/novel/list.vue'], resolve)
            },
            {
                path: 'novel/:novelId/:id',
                component: (resolve) => require(['./views/novel/detail.vue'], resolve)
            },
            {
                path: 'album',
                meta: {
                    title: '相册'
                },
                component: (resolve) => require(['./views/album/index.vue'], resolve)
            },
            {
                path: 'album/:id',
                component: (resolve) => require(['./views/album/detail.vue'], resolve)
            },
            {
                path: 'video',
                meta: {
                    title: '视频'
                },
                component: (resolve) => require(['./views/video/index.vue'], resolve)
            },
            {
                path: 'video/:id',
                component: (resolve) => require(['./views/video/detail.vue'], resolve)
            },
            {
                path: 'about',
                meta: {
                    title: '关于'
                },
                component: (resolve) => require(['./views/about.vue'], resolve)
            },
            {
                path: 'ticket',
                meta: {
                    title: '12309'
                },
                component: (resolve) => require(['./views/ticket/list.vue'], resolve)
            },
            {
                path: '*',
                meta: {
                    title: '404'
                },
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
    util.title(to.meta.title);
    next();
});

export default router;
export {routers};