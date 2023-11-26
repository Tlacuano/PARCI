<template>
    <div>
        <b-sidebar id="sidebar" :bg-variant="configuracion.tema === 'Oscuro' ? 'dark' : 'light'" :text-variant="configuracion.tema === 'Oscuro' ? 'light' : 'dark'" shadow>
            <b-container>
                <b-row>
                    <b-col cols="12" class="text-center mt-3">
                        <h5>Menú</h5>
                    </b-col>
                    

                    <b-col cols="12" class="text-start mt-4" >
                        <span><b-icon icon="person" /> Perifl</span>
                    </b-col>


                    <b-col cols="12" v-if="rol==='Administrador'">
                        <div class="text-start mt-2">
                            <span  ><b-icon icon="person"/>&nbsp;&nbsp;Gestión de Usuarios</span>
                        </div>
                    </b-col>
                    <b-col cols="12"   v-if="rol==='Administrador'">
                        <div class="text-start mt-2">
                            <span ><b-icon icon="person" />&nbsp;&nbsp;Categorías de reportes</span>
                        </div>
                    </b-col>
                    <b-col cols="12" v-if="rol==='Administrador'" >
                        <div  class="text-start mt-2">
                            <span><b-icon icon="person" />&nbsp;&nbsp;Entidades federativas</span>
                        </div>
                    </b-col>
                    <b-col cols="12"  v-if="rol==='Administrador'">
                        <div class="text-start mt-2">
                            <span  ><b-icon icon="person" />&nbsp;&nbsp;Municipios</span>
                        </div>
                    </b-col>


                    <b-col cols="12"  v-if="rol==='Moderador'">
                        <div class="text-start mt-2">
                            <span  ><b-icon icon="person" />&nbsp;&nbsp;Reportes</span>
                        </div>
                    </b-col>

                    <b-col cols="12"  v-if="rol ==='Usuario'">
                        <div class="text-start mt-2">
                            <span><b-icon icon="person" />&nbsp;&nbsp;Reportes</span>
                        </div>
                    </b-col>
                    
                </b-row>
            </b-container>
        </b-sidebar>
        
    </div>
</template>

<script lang="ts">
    import { Personalizacion } from '../modules/personalizacion/entities/personalizacion';
import Vue from 'vue';

    export default Vue.extend({
        name: 'Sidebar',
        data() {
            return {
                rol : '',
                configuracion:{
                    tema: '',
                    tamaño_letra:''
                } as Personalizacion
            }
        },
        methods: {
            obtenerDatos(){
                const usuarioString = localStorage.getItem('usuario');
                const usuario = usuarioString ? JSON.parse(usuarioString) : null;

                this.rol = usuario.rol;
                

                const personalizacionString = localStorage.getItem('personalizacion');
                const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

                this.configuracion = personalizacion;
                
            },
            dirigir(ruta: string){
                if(this.$route.path !== ruta){  
                    this.$router.push(ruta);
                }
            }
        },
        mounted() {
            this.obtenerDatos();
        },
            
        
    })
</script>


<style>
    .sidebar .close {
        outline: none;
        box-shadow: none;
        border: none;
    }

    .optionOscuro, .optionClaro{
        cursor: pointer;
        transition: background-color 0.25s ease;
    }

    .optionOscuro:hover{
        background-color: #1e1e1e;
    }

    .optionClaro:hover{
        background-color: #e6e6e6;
    }



</style>