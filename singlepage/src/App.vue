<template>
  <div id="app">

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  overflow: hidden;

  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
}
</style>

<script lang="ts">
  import Vue from 'vue';
  import { Personalizacion } from './modules/personalizacion/entities/personalizacion';
  import { cambioPersonalizacion } from './kernel/cambioPersonalizacion';

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
            if (!this.$route.path.includes('/a')  && this.$route.path !== '/configuracion' ) {
              this.$router.push('/a');
            }
          }
          if(usuario.rol === 'Usuario'){
            if (!this.$route.path.includes('/u')  && this.$route.path !== '/configuracion' ) {
              this.$router.push('/u');
            }
          }
          if(usuario.rol === 'Moderador'){
            if (!this.$route.path.includes('/m') && this.$route.path !== '/configuracion' ) {
              this.$router.push('/m');
            }
          }
        }else{
          if (this.$route.path !== '/login') {
            this.$router.push('/login');
          }
        }
      },
      setPersonalizacion(){
        const personalizacionString = localStorage.getItem('personalizacion');
        const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

        cambioPersonalizacion(personalizacion);
      }
    },
    mounted() {
      this.authenticador();
      
    },
    watch: {
      $route(to, from) {
        this.authenticador();
        this.setPersonalizacion();
      },
    }
  });

</script>


