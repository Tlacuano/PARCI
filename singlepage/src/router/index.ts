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
        component:() => import('../modules/autenticacion/adapters/view/SinHome.vue')
      },
      {
        path:'m',
      },
      {
        path:'u',
      },
      {
        path:'configuracion',
        name:'Configuracion',
        component:() => import('../modules/personalizacion/adapters/view/Personalizacion.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
