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
        path:'u',
      },
      {
        path: 'categoria',
        name: 'Categorias',
        component:() => import('@/modules/categorias/adapters/views/CategoriasPage.vue')
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
