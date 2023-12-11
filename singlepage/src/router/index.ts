import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../modules/autenticacion/adapters/view/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../modules/autenticacion/adapters/view/Router.vue"),
    children: [
      {
        path: "a",
        component: () =>
          import("../modules/autenticacion/adapters/view/Home.vue"),
        children: [
          {
            path: "entidades-federativas",
            name: "EntidadesFederativas",
            component: () =>
              import("../modules/entidades/adapters/views/Entidades.vue"),
          },
          {
            path: "categorias",
            name: "Categorias",
            component: () =>
              import("../modules/categorias/adapters/views/Categorias.vue"),
          },
          {
            path: "municipios",
            name: "Municipios",
            component: () =>
              import("../modules/municipios/adapters/views/Municipios.vue"),
          },
          {
            path: "perfil",
            name: "Perfil",
            component: () =>
              import("../modules/usuarios/adapters/views/Perfil.vue"),

          }
        ],
      },

      {
        path: "m",
        component: () =>
          import("../modules/autenticacion/adapters/view/SinHome.vue"),
        children: [
          {
            path: "/",
            name: "Reportes",
            component: () =>
              import(
                "../modules/reporte/adapters/view/VistaReportesModerador.vue"
              ),
          },
          {
            path: "reporte/:id?",
            props: true,
            name: "VerReporte",
            component: () =>
              import("../modules/reporte/adapters/view/VerReporteModerador.vue"),
          },
          {
            path: "perfil",
            name: "Perfil",
            component: () =>
              import("../modules/usuarios/adapters/views/Perfil.vue"),

          }
        ],
      },

      //Rutas de usuario
      {
        path: "u",
        component: () =>
          import("../modules/autenticacion/adapters/view/SinHome.vue"),
        children: [
          {
            path: "/",
            component: () =>
              import(
                "../modules/reporte/adapters/view/VistaReportesUsuario.vue"
              ),
          },
          {
            path: "reporte/:id?",
            props: true,
            name: "VerReporteUsuario",
            component: () =>
              import("../modules/reporte/adapters/view/VerReporteUsuario.vue"),
          },
          {
            path: "perfil",
            name: "Perfil",
            component: () =>
              import("../modules/usuarios/adapters/views/Perfil.vue"),

          }
        ],
      },
      {
        path:'configuracion',
        name:'Configuracion',
        component:() => import('../modules/personalizacion/adapters/view/Personalizacion.vue')
      },
      
    ]
  }

]

const router = new VueRouter({
  routes,
});

export default router;
