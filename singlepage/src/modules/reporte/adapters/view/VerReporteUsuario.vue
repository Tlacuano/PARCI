<template>
    <div>
        <b-container fluid>
            <b-row class="mt-4">
                <b-col cols="8">
                    <b-row>
                        <b-col cols="12">
                            <b-card>
                                <b-container>
                                    <b-row>
                                        <b-col cols="1" class="text-center" style="padding: 0px;">
                                            <b-avatar size="3rem"></b-avatar>
                                        </b-col>
                                        <b-col cols="10" style="padding: 3px;">
                                            <b-row>
                                                <b-col cols="12">
                                                    {{ reporte.nombre }} {{ reporte.apellido_paterno}}
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="12">
                                                    <small class="text-muted">{{ reporte.fecha }}</small>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-3">
                                        <b-col cols="12">
                                            <b-container>
                                                <h4>{{ reporte.titulo }}</h4>
                                                <small>{{ reporte.descripcion }}</small>
                                                <hr>
                                            </b-container>
                                        </b-col>
                                    </b-row>
                                </b-container>
                                <b-row class="justify-content-md-center">
                                    <b-col cols="9">
                                        <b-carousel
                                            id="imagenes-reporte"
                                            style="text-shadow: 0px 0px 2px #000"
                                            controls
                                            indicators
                                        >
                                            <b-carousel-slide
                                                v-for="(imagen, index) in reporte.imagen"
                                                :key="index"
                                                :img-src="imagen"
                                            ></b-carousel-slide>
                                        </b-carousel>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col cols="4">
                    <b-row>
                        <b-col cols="12">
                            <b-card>
                                
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import { ResponseConsultarReporteUsuarioDTO } from '../dtos/response-consultar-reporte-usuario.dto';
    import { desencriptar } from '../../../../kernel/crypto-js';
    import { ReporteController } from '../reporte.controller';
    import { RequestConsultarReporteUsuarioDTO } from '../dtos/request-consultar-reporte-usuario.dto';

    export default Vue.extend({
        name: 'VerReporteUsuario',
        props: ['id'],
        data() {
            return {
                reporte: {} as ResponseConsultarReporteUsuarioDTO,
                requestConsultarReporteUsuario: {} as RequestConsultarReporteUsuarioDTO,
            }
        },
        methods: {
            obtenerDatos(){
                this.requestConsultarReporteUsuario.id_reporte = desencriptar(this.id) as any;

                const infoUsuarioString = localStorage.getItem('usuario');
                const infoUsuario = infoUsuarioString ? JSON.parse(infoUsuarioString) : null;

                this.requestConsultarReporteUsuario.usuario = infoUsuario.usuario;

                this.consultarReporte();                
            },
            async consultarReporte(){
                try {
                    const controller = new ReporteController();
                    const respuesta = await controller.consultarReporteUsuario(this.requestConsultarReporteUsuario);

                    if(!respuesta.error){
                        this.reporte = respuesta.data;
                        console.log(this.reporte);
                        
                    }
                } catch (error) {
                    
                }
                
            },



            
        },
        mounted() {
            this.obtenerDatos();
        },
    });
</script>

<style >
    .carousel-inner{
        display: flex;
    }

</style>