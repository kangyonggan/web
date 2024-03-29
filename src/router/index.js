import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'
import NotFound from '../views/404.vue'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Article from '../views/article/index.vue'
import ArticleDetail from '../views/article/detail.vue'
import Market from '../views/market/index'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Index,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'article',
        component: Article,
      },
      {
        path: 'article/:id',
        component: ArticleDetail,
      },
      {
        path: 'market',
        component: Market,
      },
      {
        path: '/:catchAll(.*)',
        component: NotFound
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  // 权限校验
  if (to.meta && to.meta.authorization) {
    if (!checkLogin()) {
      next({
        path: '/login',
      })
      return
    }
  }

  next()
})

function checkLogin() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  return userInfo.token
}

export default router
