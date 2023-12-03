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
                                        <b-col cols="10">
                                            <b-row>
                                                <b-col cols="1" class="text-center" style="padding: 0px;">
                                                    <b-avatar size="3rem"></b-avatar>
                                                </b-col>
                                                <b-col cols="10" style="padding: 3px;">
                                                    <b-row>
                                                        <b-col cols="12">
                                                            {{ reporte.nombre }} {{ reporte.apellido_paterno}} {{ reporte.apellido_materno}}
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="12">
                                                            <small class="text-muted">{{ reporte.fecha }}</small>
                                                        </b-col>
                                                    </b-row>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="2">
                                            <b-row >
                                                <b-col cols="12" class="text-right">
                                                    <b-badge :style="{ backgroundColor:reporte.color}">{{ reporte.nombre_categoria }}</b-badge>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-3">
                                        <b-col cols="12" class="text-center">
                                            <b-container>
                                                <h4>{{ reporte.titulo }}</h4>
                                                <hr>
                                            </b-container>
                                        </b-col>
                                    </b-row>
                                </b-container>
                                <b-row class="justify-content-md-center mb-4">
                                    <b-col cols="10">
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
                                <b-container>
                                    <b-row class="mt-3">
                                        <b-col cols="12">
                                            <b-row>
                                                <b-col cols="12">
                                                    <span class="text-muted">{{ reporte.nombre_municipio }}</span>
                                                    <br>
                                                    <br>
                                                    {{ reporte.descripcion  }}
                                                    <hr>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6" class="text-center">
                                            <span>
                                                <b-icon :icon="reporte.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                {{ reporte.votos_positivos }}
                                            </span>
                                        </b-col>
                                        <b-col cols="6" class="text-center">
                                            <span>
                                                <b-icon :icon="reporte.voto_usuario === 'negativo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                {{ reporte.votos_negativos }}
                                            </span>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-4">
                                        <b-col cols="12">
                                            <b-container class="contenedor_opiniones">
                                                <b-row v-for="opinion in reporte.opiniones">
                                                    <b-col cols="12">
                                                        <b-card>
                                                            <b-container >
                                                                <b-row>
                                                                    <b-col cols="2">
                                                                        <b-avatar size="2rem"></b-avatar>
                                                                    </b-col>
                                                                    <b-col cols="10" style="padding: 1px">
                                                                        {{ opinion.nombre_completo_persona }}
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="justify-content-md-center mt-1">
                                                                    <b-col cols="10">
                                                                        <b-container>
                                                                            <b-row>
                                                                                <b-col cols="12">
                                                                                    <span class="text-muted">{{ opinion.opinion }}</span>
                                                                                    <br>
                                                                                </b-col>
                                                                            </b-row>
                                                                        </b-container>
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="mt-4">
                                                                    <b-col cols="6" class="text-center">
                                                                        <span>
                                                                            <b-icon :icon="opinion.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                                            {{ opinion.votos_positivos }}
                                                                        </span>
                                                                    </b-col>
                                                                    <b-col cols="6" class="text-center">
                                                                        <span>
                                                                            <b-icon :icon="opinion.voto_usuario === 'negativo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                                            {{ opinion.votos_negativos }}
                                                                        </span>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
                                        </b-col>
                                    </b-row>
                                </b-container>
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

    .contenedor_opiniones{
        height: 54vh; 
        overflow-y: auto;
    }

    .contenedor_opiniones::-webkit-scrollbar {
        width: 0.5em;
    }

    .contenedor_opiniones::-webkit-scrollbar-thumb {
        background-color: rgb(114, 114, 114)a7a;
        border-radius: 6px;
    }

    .contenedor_opiniones::-webkit-scrollbar-track {
        background-color: #c2c2c2; 
        border-radius: 6px;
    }

</style>