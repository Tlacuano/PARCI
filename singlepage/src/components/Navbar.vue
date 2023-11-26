<template>
    <div>
        <b-navbar style="background-color:var(--background-component); color: var(--text-component);">
                
                <b-navbar-brand>
                    <span >
                        <b-button size="sm" v-b-toggle.sidebar class="me-3" >
                                <b-icon icon="list" />
                        </b-button>
                    </span>   
                    &nbsp;&nbsp;PARCI <span class="d-none d-md-inline">|     Sistema de Participación Ciudadana</span>
                </b-navbar-brand>
                

                <b-navbar-nav class="ml-auto d-flex flex-row" >
                    <!-- Using 'button-content' slot -->
                    <div>
                    <button
                        class="btn btn-sm bgprimary btn-block"
                        @click="dirigirConfiguracion"
                    >
                        <b-icon icon="tools" :variant="configuracion.tema === 'Oscuro' ? 'light' : 'dark'" />
                    </button>
                    </div>

                <div class="d-flex align-items-center">
                    <b-button
                    size="sm"
                    class=" mx-3 btn-block"
                    @click="cerrarSesion"
                    :variant="configuracion.tema === 'Oscuro' ? 'dark' : 'light'"
                    >
                    <b-icon icon="power" :variant="configuracion.tema === 'Oscuro' ? 'light' : 'dark'" />
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
                    console.log('cambio');
                    
                    this.obtenerPersonalizacion();
                });
                console.log('hola');
                
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

            colocarPersonalizacion(){
                
            }
        },
        mounted() {
            
            this.obtenerPersonalizacion();
            
        }
    });
</script>

<style lang="scss" scoped>

</style>