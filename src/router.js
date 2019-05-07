import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Cfication from '@/views/Classification.vue'
import Assemble from '@/views/Assemble.vue'
import Cart from '@/views/Cart.vue'
import Index from '@/views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/Index.vue')
        },
        {
          path: 'cfication',
          name: 'cfication',
          component: () => import('@/views/Classification.vue')
        },
        {
          path: 'assemble',
          name: 'assemble',
          component: () => import('@/views/Assemble.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    }
  ]
})
