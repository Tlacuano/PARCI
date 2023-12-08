<template>
    <b-container fluid class="mt-4">
        <b-row>
            <b-col cols="12" md="8">
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
                                                {{ reporte.nombre_completo_persona }}
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
                        <b-row>
                            <b-col cols="12" class="text-center">
                                <h5 class="mt-2">{{ reporte.titulo }}</h5>
                                <hr>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" class="text-center">
                                <b-card-text>
                                    <b-img :src="reporte.imagen" fluid></b-img>
                                </b-card-text>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>
            <b-col cols="12" md="4">
                <b-card>
                    <b-container>
                        <b-row>
                            <b-col cols="12" class="text-center">
                                <h5 class="mt-2">Descripción</h5>
                                <hr>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" style="a">
                                <b-card-text>
                                    <p style="text-align: justify;">{{ reporte.descripcion }}</p>
                                </b-card-text>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
                <b-card class="mt-3">
                    <b-container>
                        <b-row>
                            <b-col cols="6" class="text-center">
                                <b-button
                                    class="mx-1"
                                    style="background-color: var(--color-primary)"
                                >
                                    <b-icon icon="check2" />
                                    Aprobar
                                </b-button>
                            </b-col>
                            <b-col cols="6" class="text-center">
                                <b-button
                                    class="mx-1"
                                    style="background-color: var(--color-secondary)"
                                    @click="rechazarReporte"
                                >
                                    <b-icon icon="X" />
                                    Rechazar
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>
        </b-row>
        <RechazarReporte :reporte="reporteSeleccionado"></RechazarReporte>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
import { ResponseConsultarReporteEsperaDto } from '../dtos/response-consultar-reporte-espera.dto';
import { RequestConsultarReporteUsuarioDTO } from '../dtos/request-consultar-reporte-usuario.dto';
import { desencriptar } from '../../../../kernel/crypto-js';
import { ReporteController } from '../reporte.controller';
import RechazarReporte  from './components/RechazarReporte.vue';
import { NuevoEstadoReporteDTO } from '../dtos/nuevo-estado-reporte.dto';

    export default Vue.extend({
        name: 'verReporteModerador',
        components: {
            RechazarReporte
        },
        props: ['id'],
        data() {
            return {
                reporte : {} as ResponseConsultarReporteEsperaDto, 
                requestConsultarReporteUsuarioDTO : {} as RequestConsultarReporteUsuarioDTO,
                reporteSeleccionado : {} as NuevoEstadoReporteDTO,
            }
        },
        methods: {
            async obtenerDatos(){
                this.requestConsultarReporteUsuarioDTO.id_reporte = desencriptar(this.id) as any;

                try {
                    const controller = new ReporteController();
                    const respuesta = await controller.consultarReporteEnEspera(this.requestConsultarReporteUsuarioDTO);

                    if(!respuesta.error){
                        this.reporte = respuesta.data;
                    }
                } catch (error) { 
                }
            },

            rechazarReporte(){
                this.reporteSeleccionado.id_reporte = this.reporte.id_reporte;
                this.reporteSeleccionado.motivo;
                this.reporteSeleccionado.estado = 'Rechazado';
                this.reporteSeleccionado.titulo = this.reporte.titulo;
                this.reporteSeleccionado.correo_electronico = this.reporte.correo_electronico;

                this.$bvModal.show('rechazar-reporte');
            },

            async aprobarReporte(){

            }
        },
        mounted() {
            this.obtenerDatos();
        }
    });

</script>