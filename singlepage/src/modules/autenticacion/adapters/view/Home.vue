<template>
    <div>
        <Navbar/>

        <b-row :class="configuracion.tema" class="main">
            <b-container fluid>
                <router-view/>
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

<style lang="scss" scoped>
    .main{
        padding: 0;
        margin: 0;
        height: 100%;
    }