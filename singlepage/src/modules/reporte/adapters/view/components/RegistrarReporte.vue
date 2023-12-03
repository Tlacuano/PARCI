<template>
    <b-modal id="registrar-reporte" size="lg"  centered hideFooter title="Registrar reporte">
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
                        <b-form-input v-model="nuevoReporte.titulo" placeholder="Ingrese el titulo del reporte"></b-form-input>
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
            
            <b-row>
                <b-col cols="12">
                    
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

    export default Vue.extend({
        name: 'RegistrarReporte',
        components: {
            
        },
        data() {
            return {
                nuevoReporte : {} as insertReporteDTO,
                categorias: [] as categoria[],
            }
        },
        methods: {
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
            }
        },
        mounted() {
            this.obtenerDatos();
        },
    });
</script>