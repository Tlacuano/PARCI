<template>
    <b-container fluid class="mt-4">
        <b-row>
            <b-col cols="12">
                <h4 class="mb-4">Gestión de Reportes</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">

            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
import { ReporteController } from '../reporte.controller';
import { ResponseReportesEnEsperaDto } from '../dtos/response-consultar-reportes-espera.dto';

    export default Vue.extend({
        name: 'VistaReportesModerador',
        data() {
            return {
                reportes: [] as ResponseReportesEnEsperaDto[],
            }
        },
        methods: {
            async consultarReportesEnEspera(){
                try {
                    const constroller = new ReporteController();
                    const respuesta = await constroller.consultarReportesEnEspera();
                    
                    if(!respuesta.error){
                        this.reportes = respuesta.data;
                        console.log(this.reportes);
                        
                    }

                } catch (error) {
                    
                }
            }
        },
        computed: {

        },
        mounted() {
            this.consultarReportesEnEspera();
        }
    });

</script>