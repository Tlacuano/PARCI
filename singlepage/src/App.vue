<template>
  <div id="app" :class="configuracion.tema ? configuracion.tema : ''">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  overflow: hidden;
}
</style>

<script lang="ts">
  import Vue from 'vue';
import { Personalizacion } from './modules/personalizacion/entities/personalizacion';

  export default Vue.extend({
    name: 'App',
    data() {
      return {
        configuracion:{
          tema: '',
          tamaño_letra:''
        } as Personalizacion
      }
    },
    methods: {
      authenticador(){
        if(localStorage.getItem('token')){
          const usuarioString = localStorage.getItem('usuario');
          const usuario = usuarioString ? JSON.parse(usuarioString) : null;

          if (this.$route.path === '/login') {
            this.$router.push('/');
          }

          if(usuario.rol === 'Administrador'){
            if (!this.$route.path.includes('/a') && this.$route.path !== '/' && this.$route.path !== '/configuracion' ) {
              this.$router.push('/');
            }
          }
          if(usuario.rol === 'Usuario'){
            if (!this.$route.path.includes('/u') && this.$route.path !== '/' && this.$route.path !== '/configuracion' ) {
              this.$router.push('/');
            }
          }
          if(usuario.rol === 'Moderador'){
            if (!this.$route.path.includes('/u')  && this.$route.path !== '/' && this.$route.path !== '/configuracion' ) {
              this.$router.push('/');
            }
          }
        }else{
          if (this.$route.path !== '/login') {
            this.$router.push('/login');
          }
        }
      },
      obtenerPersonalizacion(){
        const personalizacionString = localStorage.getItem('personalizacion');
        const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

        if(personalizacion){
          this.configuracion = personalizacion;  
        }else{
          this.configuracion = {
            tema: 'Claro',
            tamaño_letra:''
          } as Personalizacion
        }
              
      },
    },
    mounted() {
      this.authenticador();
    },
    watch: {
      $route(to, from) {
        this.authenticador();
        this.obtenerPersonalizacion();
      },
    }
  });

</script>


