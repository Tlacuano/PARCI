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
    component:() => import('../modules/autenticacion/adapters/view/Router.vue'),
    children:[
      {
        path:'a',
        component:() => import('../modules/autenticacion/adapters/view/Home.vue'),
        children:[
          {
            path:'entidades-federativas',
            name:'EntidadesFederativas',
            component:() => import('../modules/entidades/adapters/views/Entidades.vue')
          },
          {
            path:'municipios',
            name:'Municipios',
            component:() => import('../modules/municipios/adapters/views/Municipios.vue')
          },
        ]
      },

      {
        path:'m',
        component:() => import('../modules/autenticacion/adapters/view/Home.vue'),
        children:[
          {
            path:'/',
            name:'Reportes',
            component:() => import('../modules/reporte/adapters/view/VistaReportesModerador.vue')
          },
        ]
      },

      //Rutas de usuario
      {
        path:'u',
        component:() => import('../modules/autenticacion/adapters/view/Home.vue'),
        children:[
          {
            path:'/',
            component:() => import('../modules/reporte/adapters/view/VistaReportesUsuario.vue')
          },
          {
            path:'reporte/:id?',
            props:true,
            name:'VerReporteUsuario',
            component:() => import('../modules/reporte/adapters/view/VerReporteUsuario.vue')
          }
        ]
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
