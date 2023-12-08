<template>
    <b-modal id="registrar-reporte" size="lg"  centered hideFooter title="Registrar reporte" @hidden="cerrar()">
        <b-container fluid>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Categoría:">
                        <b-form-select v-model="nuevoReporte.fk_idCategoria" :options="categorias" value-field="id_categoria" text-field="nombre_categoria">
                            <template #first>
                                <b-form-select-option :value="undefined" disabled>Seleccione...</b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Titulo:">
                        <b-form-input  v-model="nuevoReporte.titulo" placeholder="Ingrese el titulo del reporte"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Descripción:">
                        <b-form-textarea
                            v-model="nuevoReporte.descripcion"
                            placeholder="Ingrese la descripción del reporte"                 
                            @keydown.enter.prevent="insertarSaltoDeLinea"
                            rows="5"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
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
            <b-row class="mt-4">
                <b-col cols="12 text-right">
                    <b-button style="background-color: var(--color-primary);" @click="RegistrarReporte">Registrar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { insertReporteDTO } from '../../dtos/registrar-reporte.dto';
    import { CategoriaBoundary } from '../../../../../modules/categorias/adapters/categoria.boundary';
    import { categoria } from '../../../../../modules/categorias/entities/categoria';
    import { ReporteController } from '../../reporte.controller';

    export default Vue.extend({
        name: 'RegistrarReporte',
        components: {
            
        },
        data() {
            return {
                nuevoReporte : {} as insertReporteDTO,
                categorias: [] as categoria[],

                imagen: null as File | null,
                imagenBase64: null as string | null,
            }
        },
        methods: {
            async RegistrarReporte(){
                try {

                    Vue.swal({
                        title: 'Estas seguro?',
                        text: "Se registrara el reporte",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'var(--color-primary)',
                        cancelButtonColor: 'var(--color-secondary)',
                        confirmButtonText: 'Si, registrar!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const controller = new ReporteController();
                            const respuesta = await controller.registrarReporte(this.nuevoReporte);

                            if(!respuesta.error){
                                Vue.swal({
                                    title: 'Reporte registrado',
                                    text: "El reporte se registro correctamente",
                                    icon: 'success',
                                    confirmButtonColor: 'var(--color-primary)',
                                    confirmButtonText: 'Aceptar'
                                })
                                this.cerrar();

                            }

                        }
                    })            

                } catch (error) {
                    console.log(error);
                }
            },
            //obtener datos del usuario, fecha de hoy y categorias
            async obtenerDatos(){
                const infoUsuario = JSON.parse(localStorage.getItem('usuario') || '{}');
                this.nuevoReporte.usuario = infoUsuario.usuario;
                this.nuevoReporte.fk_idMunicipio = infoUsuario.municipio;
                
                this.nuevoReporte.fecha = new Date().toLocaleDateString() as any;

                try {
                    const respuesta = await CategoriaBoundary.getCategorias_local();
                    this.categorias = respuesta.data as categoria[];
                } catch (error) {
                    
                }
            },
            insertarSaltoDeLinea(){
                this.nuevoReporte.descripcion += '\n';
            },
            //manejo de imagen
            async handleFileChange(event : any) {
                const fileInput = event.target;
      
                if (fileInput.files.length > 0) {
                    const selectedFile = fileInput.files[0];
                    
                    // Aquí puedes acceder a e.target.result si es relevante para tu caso
                    // Por ejemplo, si necesitas leer el contenido de un archivo de imagen
                    const reader = new FileReader();

                    reader.onload = (e) => {
                    // e.target.result contiene la información del archivo
                        console.log("Contenido del archivo:", e.target?.result);
                        this.nuevoReporte.imagen = e.target?.result as string
                    };
                    reader.readAsDataURL(selectedFile);
                }
                
            },

            cerrar(){
                this.$bvModal.hide('registrar-reporte');
                this.limpiar();
            },
            limpiar(){
                this.nuevoReporte = {} as insertReporteDTO;
                this.imagen = null;
                this.imagenBase64 = null;

            }
        },
        mounted() {
            this.obtenerDatos();
        },
    });
</script>