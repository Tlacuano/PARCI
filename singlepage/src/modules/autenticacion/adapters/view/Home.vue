<template>
    <div>
        <Navbar/>

        <b-row :class="configuracion.tema" class="main">
            <b-container fluid>
                <Transition name="fade" mode="out-in">
                    <router-view />
                </Transition>
            </b-container>     
        </b-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Navbar from '../../../../components/Navbar.vue';
import { Personalizacion } from '../../../../modules/personalizacion/entities/personalizacion';

    export default Vue.extend({
        name: 'Home',
        components: {
            Navbar
        },
        data() {
            return {
                configuracion:{
                    tema: '',
                    tamaño_letra:''
                } as Personalizacion
            }
        },
        methods: {
            obtenerPersonalizacion(){
                const personalizacionString = localStorage.getItem('personalizacion');
                const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

                this.configuracion = personalizacion;
            },
        },
        mounted() {
            this.obtenerPersonalizacion();
        },
    });
</script>

<style scoped>
    
  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>