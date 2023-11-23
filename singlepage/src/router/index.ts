import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/login',
    name:'Login',
    component:() => import('../modules/autenticacion/adapters/view/Login.vue')
  },
  {
    path:'/',
    name:'Home',
    component:() => import('../modules/autenticacion/adapters/view/Home.vue'),
    children:[
      {
        path:'a',
      },
      {
        path:'m',
      },
      {
        path:'u'
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
