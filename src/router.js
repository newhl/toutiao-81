import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login/index.vue'
import Main from './views/home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/home/comment',
          component: () => import('./views/comment') // 按需加载的页面
        },
        {
          path: '/home/material',
          component: () => import('./views/material') // 按需加载的页面
        },
        {
          path: '/home/articles',
          component: () => import('./views/articles') // 按需加载的页面
        },
        {
          path: '/home/publish',
          component: () => import('./views/publish') // 按需加载的页面
        },
        {
          path: '/home/publish/:articleId', // 编辑文章 动态路由
          component: () => import('./views/publish') // 按需加载的页面
        },
        {
          path: '/home/fansdata', // 编辑文章 动态路由
          component: () => import('./views/fans') // 按需加载的页面
        },
        {
          path: '/home/account', // 编辑文章 动态路由
          component: () => import('./views/account') // 按需加载的页面
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
