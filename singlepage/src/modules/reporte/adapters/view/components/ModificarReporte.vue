<template>
    <b-modal id="modificar-reporte" centered hideFooter title="Modificar Reporte" @hidden="cerrar()">
        <b-row>
            <b-col>
                <b-container>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group label="Título:">
                                <b-form-input v-model="reporte.titulo"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group label="Descripción:">
                                <b-form-textarea
                                    v-model="reporte.descripcion"
                                    placeholder="Ingrese la descripción del reporte"
                                    rows="5"
                                ></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group label="Imagen:">
                                <b-form-file
                                    :state="Boolean(imagen)"
                                    placeholder="Seleccione una imagen..."
                                    accept="image/*"
                                    @change="handleFileChange($event)"
                                ></b-form-file>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col cols="12 text-right">
                            <b-button style="background-color: var(--color-primary);" @click="modificarReporte">Modificar</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { ResponseConsultarReporteUsuarioDTO } from '../../dtos/response-consultar-reporte-usuario.dto';
    import { modifyReporteDTO } from '../../dtos/modify-reporte.dto';
    import { ReporteController } from '../../reporte.controller';

    export default Vue.extend({
        name: 'ModificarReporte',
        props: {
            reporte: {
                type: Object as () => ResponseConsultarReporteUsuarioDTO,
                required: true
            }
        },
        data() {
            return {
                imagen: null as File | null,
                imagenBase64: null as string | null,
            }
        },
        methods: {

            handleFileChange(event: any) {
                this.imagen = event.target.files[0];
                this.convertirImagenBase64();
            },

            convertirImagenBase64() {
                const reader = new FileReader();
                reader.readAsDataURL(this.imagen as Blob);
                reader.onload = () => {
                    this.imagenBase64 = reader.result as string;
                };
            },

            async modificarReporte() {
                try {
                    const reporte = {
                        id_reporte: this.reporte.id_reporte,
                        titulo: this.reporte.titulo,
                        descripcion: this.reporte.descripcion,
                        imagen: this.imagenBase64 || this.reporte.imagen,
                        usuario: this.reporte.usuario,
                    } as modifyReporteDTO;

                    Vue.swal({
                        title: 'Estas seguro?',
                        text: "Se modificara el reporte y estara en espera de ser aprobado por algún moderador, en caso de ser rechazado se ocultara el reporte permanentemente",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'var(--color-primary)',
                        cancelButtonColor: 'var(--color-secondary)',
                        confirmButtonText: 'Si, modificar!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const controller = new ReporteController();
                            const respuesta = await controller.modificarReporte(reporte);
                            
                            if (!respuesta.error) {
                                Vue.swal({
                                    title: 'Reporte modificado',
                                    text: "El reporte se modifico correctamente, y esta en espera de ser aprobado por algún moderador",
                                    icon: 'success',
                                    confirmButtonColor: 'var(--color-primary)',
                                }).then(() => {
                                    this.cerrar();
                                    window.location.reload();
                                });
                            } 
                        }
                    })   
                } catch (error) {
                    console.log(error);
                }
            },

            cerrar(){
                this.$bvModal.hide('modificar-reporte');
                this.limpiar();
            },
            limpiar(){
                this.imagen = null;
                this.imagenBase64 = null;
            }
        }
    })

</script>