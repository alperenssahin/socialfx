import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
    children:[
      {
        path: 'blog',
        name: 'Blog',
        component: () => import(/* webpackChunkName: "Blog" */ '../views/Home/blog')
      },
      {
        path: 'app',
        name: 'App',
        component: () => import(/* webpackChunkName: "App" */ '../views/Home/app')
      },
      {
        path: 'dashboard',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Home/profile')
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
