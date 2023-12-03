<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <b-row align-h="between">
                    <b-col cols="12" md="4">
                        <b-row class="mt-4">
                            <b-container>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card>
                                            <b-row class="mt-4">
                                                <b-col cols="12">
                                                    <b-select>
                                                        <option value="">Seleccionar Categoria</option>
                                                    </b-select>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-4">
                                                <b-col cols="12">
                                                    <b-select>
                                                        <option value="">Seleccionar Municipio</option>
                                                    </b-select>
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-4">
                                                <b-col cols="12">
                                                    <b-form-datepicker class="custom-datepicker"></b-form-datepicker>
                                                </b-col>
                                            </b-row>
                                            <b-card-footer class="text-center">
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-card>
                                                            <b-row>
                                                                <b-col cols="12">
                                                                    <b-button style="width:100%; padding:8px; background-color: var(--color-primary);">Registrar Reporte</b-button> 
                                                                </b-col>
                                                            </b-row>
                                                        </b-card>
                                                    </b-col>
                                                </b-row>
                                            </b-card-footer>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="8">
                        <b-row class="mt-4">
                            <b-container>
                                <b-row>
                                    <b-col cols="12">
                                        <b-card class="contenedor_reportes">
                                            <b-container fluid>
                                                <b-row v-for="reporte in reportes">
                                                    <b-col cols="12">
                                                        <b-card class="mb-4">
                                                            <b-container>
                                                                <b-row class=" px-5">
                                                                    <b-col cols="10">
                                                                        <b-row>
                                                                            <b-col cols="1" class="text-center" style="padding: 0px;">
                                                                                <b-avatar size="3rem"></b-avatar>
                                                                            </b-col>
                                                                            <b-col cols="10" style="padding: 0px;">
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
                                                                    </b-col>
                                                                    <b-col cols="2" class="text-right">
                                                                        <b-row >
                                                                            <b-col cols="12" class="text-right">
                                                                                <b-badge :style="{ backgroundColor:reporte.color}">{{ reporte.nombre_categoria }}</b-badge>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="mt-4  px-5">
                                                                    <b-col cols="12" class="text-center">
                                                                        <b-img fluid rounded :src="reporte.imagen[0]" :alt="reporte.titulo"  @click="verReporte(reporte.id_reporte)" class="seleccionable"/>                                                    
                                                                    </b-col>      
                                                                </b-row>
                                                                <b-row class="mt-4  px-5">
                                                                    <b-col cols="12">
                                                                            <b-container fluid>
                                                                                <b-row>
                                                                                    <b-col cols="12" class="text-center">
                                                                                        <h4>{{ reporte.titulo }}</h4>
                                                                                        <hr/>
                                                                                    </b-col>
                                                                                </b-row>
                                                                                <b-row>
                                                                                    <b-col cols="6" class="text-center">
                                                                                        <span>
                                                                                            <b-icon :icon="reporte.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                                                            {{ reporte.votos_positivos }}
                                                                                        </span>
                                                                                    </b-col>
                                                                                    <b-col cols="6"  class="text-center">
                                                                                        <span>
                                                                                            <b-icon :icon="reporte.voto_usuario === 'positivo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                                                            {{ reporte.votos_negativos }}
                                                                                        </span>
                                                                                    </b-col>
                                                                                </b-row>
                                                                            </b-container>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                        </b-card>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>


<script lang="ts">
    import Vue from 'vue';
    import { ObtenerReporteDTO } from '../dtos/obtener-reporte.dto';
    import { ObtenerReportesDTO } from '../dtos/reponse-get-reporte';
    import { ReporteController } from '../reporte.controller';
    import { encriptar } from '../../../../kernel/crypto-js';

    export default Vue.extend({
        name: 'VistaReportesUsuario',
        data() {
            return {
                filtros:{
                    usuario: "",
                    fk_idMunicipio : 0,
                    fecha : undefined,
                    fk_idCategoria : undefined
                } as ObtenerReporteDTO,

                reportes: [] as ObtenerReportesDTO[]
            }
        },
        methods: {
            obtenerInformacion(){
                const informacionUsuarioString = localStorage.getItem('usuario');
                const informacionUsuario = informacionUsuarioString ? JSON.parse(informacionUsuarioString) : null;

                this.filtros.usuario = informacionUsuario.usuario;
                this.filtros.fk_idMunicipio = informacionUsuario.municipio;

                this.obtenerReportes();
            },

            async obtenerReportes(){
                try {
                    const controller = new ReporteController();
                    const response = await controller.obtenerReportes(this.filtros);
                    
                    if(!response.error){
                        console.log(response.data);
                        
                        this.reportes = response.data;  
                    }    
                } catch (error) {
                    
                }
            },

            verReporte(id_reporte: number){                
                const parametroSeguro = encriptar(id_reporte.toString());
                this.$router.push(`u/reporte/${parametroSeguro}`);
            }
        },
        mounted() {
            this.obtenerInformacion();
        },
    });


</script>


<style>
    .contenedor_reportes{
        max-height: 87vh; 
        overflow-y: auto;
    }

    .contenedor_reportes::-webkit-scrollbar {
        width: 0.5em;
    }

    .contenedor_reportes::-webkit-scrollbar-thumb {
        background-color: rgb(114, 114, 114)a7a;
        border-radius: 6px;
    }

    .contenedor_reportes::-webkit-scrollbar-track {
        background-color: #c2c2c2; 
        border-radius: 6px;
    }

    .seleccionable{
        cursor: pointer;
    }

</style>