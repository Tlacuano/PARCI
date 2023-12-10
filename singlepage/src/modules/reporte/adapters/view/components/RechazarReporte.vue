<template>
    <b-modal id="rechazar-reporte" title="Motivo" centered hideFooter @hidden="close()">
        <b-container>
            <b-form-group label="Escriba el motivo por el cual el reporte es rechazado:">
                <b-form-textarea
                    id="textarea"
                    v-model="reporte.motivo"
                    placeholder="Motivo..."
                    rows="6"
                ></b-form-textarea>
            </b-form-group>
            <b-row class="mt-4">
                <b-col cols="12 text-right">
                    <b-button @click="rechazarReporte"  style="background-color: var(--color-primary);" >Enviar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { NuevoEstadoReporteDTO } from '../../dtos/nuevo-estado-reporte.dto';
import { ReporteController } from '../../reporte.controller';

    export default Vue.extend({
        name: 'RechazarReporte',
        props: {
            reporte: {
                type: Object as () => NuevoEstadoReporteDTO,
                required: true
            }
        },
        data() {
            return {

            }
        },
        methods: {
            async rechazarReporte(){
                try {
                    const controller = new ReporteController();
                    
                    Vue.swal({
                        title: 'Estas seguro?',
                        text: "Se rechazara el reporte y los usuarios ya no podran verlo",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'var(--color-primary)',
                        cancelButtonColor: 'var(--color-secondary)',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Si, rechazar'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const respuesta = await controller.modficarEstadoReporte(this.reporte);
                            
                            if(!respuesta.error){
                                Vue.swal({
                                    title: 'Reporte rechazado',
                                    text: "El reporte ha sido rechazado",
                                    icon: 'success',
                                    confirmButtonColor: 'var(--color-primary)',
                                    confirmButtonText: 'Ok'
                                }).then(() => {
                                    window.location.reload();
                                })
                                this.close();

                            }

                        }
                    })  
                } catch (error) {
                    console.log(error);
                }
            },

            close(){
                this.$bvModal.hide('rechazar-reporte');
                this.limpiar();
            },
            limpiar(){
                this.reporte.motivo = '';
            }

        },
        computed: {

        },
        mounted() {

        }
    });
</script>