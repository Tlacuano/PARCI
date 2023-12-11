<template>
    <div>
        <b-navbar style="background-color:var(--background-component);">
                
                <b-navbar-brand>
                    <span  >
                        <b-button  style="background-color:var(--background-component);" size="sm" v-b-toggle.sidebar class="me-3" >
                                <b-icon style=" color: var(--text-color)"  icon="list" />
                        </b-button>
                    </span>   
                    <span  style=" color: var(--text-color)" @click="inicio()" class="titulo">
                        &nbsp;&nbsp;PARCI <span  class="d-none d-md-inline">|     Sistema de Participación Ciudadana</span>
                    </span>
                </b-navbar-brand>
                

                <b-navbar-nav class="ml-auto d-flex flex-row" >
                    <div>
                        <button
                            style=" color: var(--text-color)"
                            class="btn btn-sm btn-block"
                            @click="dirigirConfiguracion"
                        >
                            <b-icon 
                                style=" color: var(--text-color)"
                                icon="gear"  />
                        </button>
                    </div>

                    <div class="d-flex align-items-center">
                        <b-button
                        size="sm"
                        class=" mx-3 btn-block"
                        @click="cerrarSesion"
                        style="background-color:var(--background-component);"
                        >
                            <b-icon
                                style=" color: var(--text-color)"
                                icon="power"  />
                        </b-button>
                    </div>
                
                </b-navbar-nav>
                <!-- menu de cierre de sesion y perfil -->


            </b-navbar>


        <Sidebar/>
    </div>




</template>

<script lang="ts">
    import Vue from 'vue';
    import {Personalizacion} from '../modules/personalizacion/entities/personalizacion'
    import Sidebar from './Sidebar.vue';
import { cambioPersonalizacion } from '@/kernel/cambioPersonalizacion';

    export default Vue.extend({
        name: 'Navbar',
        data() {
            return {
                configuracion:{
                    tema: '',
                    tamaño_letra:''
                } as Personalizacion,


                
            }
        },
        components: {
            Sidebar
        },
        methods: {
            obtenerPersonalizacion(){
                window.addEventListener('storage', () => {
                    
                    this.obtenerPersonalizacion();
                });
                                
                const personalizacionString = localStorage.getItem('personalizacion');
                const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

                this.configuracion = personalizacion;
            },
            dirigirConfiguracion(){
                if(this.$route.path !== '/configuracion'){  
                    this.$router.push('/configuracion');
                }
            },
            
            cerrarSesion(){
                Vue.swal({
                    title: '¿Estas seguro?',
                    text: "Se cerrara la sesion actual",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'var(--color-primary)',
                    cancelButtonColor: 'var(--color-secondary)',
                    cancelButtonText:'Cancelar',
                    confirmButtonText: 'Si, cerrar sesion'
                }).then((result) => {
                    if (result.isConfirmed) {

                        localStorage.removeItem('token');
                        localStorage.removeItem('usuario');
                        localStorage.removeItem('personalizacion');
                        this.$router.push('/login');
                        cambioPersonalizacion({
                            tema: 'Claro',
                            tamaño_letra: 'Mediana'
                        });
                    }
                })
                
            },
            inicio(){
                if(this.$route.path !== '/'){  
                    this.$router.push('/');
                }
            }
        },
        mounted() {
            
            this.obtenerPersonalizacion();
            
        }
    });
</script>

<style scoped>
    .titulo{
        cursor: pointer;
    }
</style>