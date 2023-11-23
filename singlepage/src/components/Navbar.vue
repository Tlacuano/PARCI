<template>
    <div>
        <b-navbar :variant="configuracion.tema === 'Oscuro' ? 'dark' : 'light'" :type="configuracion.tema === 'Oscuro' ? 'dark' : 'light'">
                <!-- titulo responsivo -->
                <b-navbar-brand>
                    <span >
                        <b-button size="sm" v-b-toggle.sidebar class="me-3" :variant="configuracion.tema === 'Oscuro' ? 'dark' : 'light'">
                                <b-icon icon="list" :variant="configuracion.tema === 'Oscuro' ? 'light' : 'dark'" />
                        </b-button>
                    </span>   
                    &nbsp;&nbsp;PARCI <span class="d-none d-md-inline">|     Sistema de Participacion Ciudadana</span>
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

    export default Vue.extend({
        name: 'Navbar',
        data() {
            return {
                configuracion:{
                    tema: '',
                    tamaño_letra:''
                } as Personalizacion
                
            }
        },
        components: {
            Sidebar
        },
        methods: {
            obtenerPersonalizacion(){
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
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText:'Cancelar',
                    confirmButtonText: 'Si, cerrar sesion'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('usuario');
                        localStorage.removeItem('personalizacion');
                        this.$router.push('/login');
                    }
                })
                
            }
        },
        mounted() {
            this.obtenerPersonalizacion();
        },
    });
</script>

<style lang="scss" scoped>

</style>