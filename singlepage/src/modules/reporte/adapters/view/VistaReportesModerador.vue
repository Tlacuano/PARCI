<template>
    <b-container fluid class="mt-4">
        <b-row>
            <b-col cols="12">
                <h4 class="mb-4">Gestión de Reportes</h4>
            </b-col>
        </b-row>
        <b-col cols="12" md="2">
            <b-pagination
                align="fill"
                v-model="currentPage"
                :total-rows="reportes.length"
                :per-page="perPage"
                aria-controls="reportes-table"
            ></b-pagination>
        </b-col>
        <b-row>
            <b-col cols="12" v-if="reportes.length > 0">
                <b-table
                    id="reportes-table"
                    hover
                    :items="reportes"
                    :fields="[
                        {
                            key: 'id_reporte',
                            label: 'Número',
                            thStyle: { width: '5%' },
                            sortable: true,
                            class: 'text-center',
                        },
                        {
                            key: 'titulo',
                            label: 'Título',
                            thStyle: { width: '85%' },
                            sortable: true,
                        },
                        {
                            key: 'acciones',
                            label: 'Acciones',
                            thStyle: { width: '10%' },
                            class: 'text-center',
                        },
                    ]"
                >
                    <template #cell(acciones)="row">
                        <b-button 
                            @click="verReporte(row.item)"
                            size="sm"
                            class="mx-1"
                            style="background-color: var(--color-primary)"
                        >
                            <b-icon  icon="eye-fill" />
                        </b-button>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="12" v-else>
                <b-alert show variant="warning">
                    No hay reportes en espera
                </b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
import { ReporteController } from '../reporte.controller';
import { ResponseReportesEnEsperaDto } from '../dtos/response-consultar-reportes-espera.dto';
import { encriptar } from '@/kernel/crypto-js';

    export default Vue.extend({
        name: 'VistaReportesModerador',
        data() {
            return {
                reportes: [] as ResponseReportesEnEsperaDto[],
                currentPage: 1,
                perPage: 10,
            }
        },
        methods: {
            async consultarReportesEnEspera(){
                try {
                    const constroller = new ReporteController();
                    const respuesta = await constroller.consultarReportesEnEspera();
                    
                    if(!respuesta.error){
                        this.reportes = respuesta.data;
                    }
                } catch (error) {
                    
                }
            },

            verReporte(reporte: ResponseReportesEnEsperaDto){
                const parametroSeguro = encriptar(reporte.id_reporte.toString());
                this.$router.push(`m/reporte/${parametroSeguro}`);
            }
        },
        computed: {

        },
        mounted() {
            this.consultarReportesEnEspera();
        }
    });

</script>