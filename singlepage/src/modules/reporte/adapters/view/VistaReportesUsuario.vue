<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <b-row align-h="between">
                    <b-col cols="12" md="4">
                        <b-row class="mt-4">
                            <b-container >
                                <b-row >
                                    <b-col cols="12">
                                        <b-card>
                                            <b-row class="mt-1">
                                                <b-col cols="12">
                                                    <h4>Filtros de búsqueda</h4>
                                                    <hr>
                                                    <b-form-group label="Categorias:">
                                                        <b-form-select v-model="filtros.fk_idCategoria" :options="categorias" value-field="id_categoria" text-field="nombre_categoria">
                                                            <template #first>
                                                                <b-form-select-option :value=undefined>Ninguno</b-form-select-option>
                                                            </template>
                                                        </b-form-select>
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
            
                                            <b-row class="mt-4">
                                                <b-col cols="12">
                                                    <b-form-group label="Fecha:">
                                                        <b-form-datepicker
                                                            v-model="filtros.fecha"
                                                            class="custom-datepicker" 
                                                            placeholder="Seleccione..."
                                                            hideHeader
                                                            hideFooter
                                                            reset-button
                                                            locale="es"
                                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                            ></b-form-datepicker>
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col cols="12" class="mt-3  mb-3">
                                                    <b-button  style="width:100%; padding:8px;" @click="obtenerReportes">Filtrar</b-button>
                                                </b-col>
                                            </b-row>
                                        </b-card>
                                        <b-card class="text-center mt-4">
                                            <b-row>
                                                <b-col cols="12">
                                                    <b-button v-b-modal.registrar-reporte style="width:100%; padding:8px; background-color: var(--color-primary);">Registrar Reporte</b-button> 
                                                </b-col>
                                            </b-row>
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
                                            <b-container fluid class="contenedor_reportes" v-if="reportes.length > 0">
                                                <b-row v-for="reporte in reportes">
                                                    <b-col cols="12">
                                                        <b-card class="mb-4">
                                                            <b-container>
                                                                <b-row class=" px-3">
                                                                    <b-col cols="9">
                                                                        <b-row>
                                                                            <b-col cols="2" md="1" class="text-center" style="padding: 0px;">
                                                                                <b-avatar size="3rem"></b-avatar>
                                                                            </b-col>
                                                                            <b-col cols="8" md="9" style="padding: 3px;">
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
                                                                    <b-col cols="3" class="text-right">
                                                                        <b-row >
                                                                            <b-col cols="8" class="text-right" style="padding: 0%;">
                                                                                <b-badge :style="{ backgroundColor:reporte.color}">{{ reporte.nombre_categoria }}</b-badge>
                                                                            </b-col>
                                                                            <b-col v-if="reporte.usuario === filtros.usuario" cols="2" class="text-right">
                                                                                <b-dropdown variant="link" size="sm" class="text-right" no-caret>
                                                                                    <template #button-content>
                                                                                        <b-icon icon="three-dots-vertical"></b-icon>
                                                                                    </template>
                                                                                    <b-dropdown-item @click="seleccionarReporte(reporte)" >Editar</b-dropdown-item>
                                                                                    <b-dropdown-item @click="seleccionarReporte(reporte)">Eliminar</b-dropdown-item>
                                                                                </b-dropdown>
                                                                            </b-col>
                                                                        </b-row>
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="mt-4 justify-content-md-center">
                                                                    <b-col cols="9" class="text-center">
                                                                        <b-img fluid rounded :src="reporte.imagen" :alt="reporte.titulo"  @click="verReporte(reporte.id_reporte)" class="seleccionable" style="max-height: 55vh;"/>                                                    
                                                                    </b-col>      
                                                                </b-row>
                                                                <b-row class="mt-4 justify-content-md-center">
                                                                    <b-col cols="10">
                                                                        <b-container fluid>
                                                                            <b-row>
                                                                                <b-col cols="12" class="text-center">
                                                                                    <h5>{{ reporte.titulo }}</h5>
                                                                                    <hr/>
                                                                                </b-col>
                                                                            </b-row>
                                                                            <b-row>
                                                                                <b-col cols="6" class="text-center">
                                                                                    <h5 class="seleccionable" @click="votarReporte(reporte.id_reporte, 'positivo')">
                                                                                        <b-icon :icon="reporte.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                                                        {{ reporte.votos_positivos }}
                                                                                    </h5>
                                                                                </b-col>
                                                                                <b-col cols="6"  class="text-center">
                                                                                    <h5 class="seleccionable" @click="votarReporte(reporte.id_reporte, 'negativo')">
                                                                                        <b-icon :icon="reporte.voto_usuario === 'negativo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                                                        {{ reporte.votos_negativos }}
                                                                                    </h5>
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
                                            <b-container v-else>
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-alert show >
                                                            No hay reportes
                                                        </b-alert>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <ModificarReporte :reporte="reporteSeleccionado"/>
        <RegistrarReporte/>
    </b-container>
</template>


<script lang="ts">
    import Vue from 'vue';
    import { ObtenerReporteDTO } from '../dtos/obtener-reporte.dto';
    import { ObtenerReportesDTO } from '../dtos/reponse-get-reporte';
    import { ReporteController } from '../reporte.controller';
    import { encriptar } from '../../../../kernel/crypto-js';
    import RegistrarReporte from './components/RegistrarReporte.vue';
    import { categoria } from '../../../../modules/categorias/entities/categoria';
    import { CategoriaBoundary } from '../../../../modules/categorias/adapters/categoria.boundary';
    import { votarReporteDTO } from '../dtos/votar-reporte.dto';
    import ModificarReporte from './components/ModificarReporte.vue';
    import { RequestConsultarReporteUsuarioDTO } from '../dtos/request-consultar-reporte-usuario.dto';
    import { ResponseConsultarReporteUsuarioDTO } from '../dtos/response-consultar-reporte-usuario.dto';

    export default Vue.extend({
        name: 'VistaReportesUsuario',
        components: {
            RegistrarReporte,
            ModificarReporte

        },
        data() {
            return {
                filtros:{
                    usuario: "",
                    fk_idMunicipio : 0,
                    fecha : undefined,
                    fk_idCategoria : undefined
                } as ObtenerReporteDTO,

                reportes: [] as ObtenerReportesDTO[],
                categorias: [] as categoria[],

                reporteSeleccionado: {} as ResponseConsultarReporteUsuarioDTO

            }
        },
        methods: {
            obtenerInformacion(){
                const informacionUsuarioString = localStorage.getItem('usuario');
                const informacionUsuario = informacionUsuarioString ? JSON.parse(informacionUsuarioString) : null;

                this.filtros.usuario = informacionUsuario.usuario;
                this.filtros.fk_idMunicipio = informacionUsuario.municipio;

                this.obtenerReportes();
                this.obtenerCategorias();
            },

            async obtenerReportes(){                
                try {
                    const controller = new ReporteController();
                    const response = await controller.obtenerReportes(this.filtros);
                    
                    if(!response.error){
                        
                        this.reportes = response.data;                        
                    }    
                } catch (error) {
                    
                }
            },

            async obtenerCategorias(){
                try {
                    const respuesta = await CategoriaBoundary.getCategorias_local();
                    this.categorias = respuesta.data as categoria[];
                } catch (error) {
                    
                }
            },

            verReporte(id_reporte: number){                
                const parametroSeguro = encriptar(id_reporte.toString());
                this.$router.push(`u/reporte/${parametroSeguro}`);
            },

            async votarReporte(id_reporte:number, voto: string){
                
                try {
                    const VotarReporteDto = {
                        id_reporte : id_reporte,
                        voto : voto,
                        usuario : this.filtros.usuario
                    } as votarReporteDTO;

                    const controller = new ReporteController();
                    const respuesta = await controller.votarReporte(VotarReporteDto);

                    if(!respuesta.error){
                        this.obtenerReportes();
                    }
                } catch (error) {
                    
                }
            },



            //modal editar
            async seleccionarReporte( reporte : ObtenerReportesDTO){
                const informacionReporte = {
                    usuario : reporte.usuario,
                    id_reporte : reporte.id_reporte,
                } as RequestConsultarReporteUsuarioDTO;


                const controller = new ReporteController();
                const respuesta = await controller.consultarReporteUsuario(informacionReporte);

                if(!respuesta.error){
                    this.reporteSeleccionado = respuesta.data;
                    this.$bvModal.show('modificar-reporte');                     
                }
            }

        },
        mounted() {
            this.obtenerInformacion();
        },
    });


</script>


<style>
    .contenedor_reportes{
        height: 87vh; 
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