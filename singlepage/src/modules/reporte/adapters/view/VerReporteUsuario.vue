<template>
    <div>
        <b-container fluid>
            <b-row class="mt-4">
                <b-col cols="12" md="8">
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
                                    <b-col cols="10" class="text-center">
                                        <b-img :src="reporte.imagen" fluid style="max-height: 63vh; min-width: 70vh; max-width: 100vh;"></b-img>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col cols="12" md="4">
                    <b-row>
                        <b-col cols="12">
                            <b-card class="opiniones">
                                <b-container>
                                    <b-row class="mt-1 contendor_descripcion">
                                        <b-col cols="12">
                                            <b-row>
                                                <b-col cols="12">
                                                    <span class="text-muted">{{ reporte.nombre_municipio }}</span>
                                                    <br>
                                                    <br>
                                                    <p style="text-align: justify;">
                                                        {{ reporte.descripcion  }}
                                                    </p>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <hr>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="6" class="text-center">
                                            <h5>
                                                <b-icon class="seleccionable" @click="votarReporteUsuario('positivo')" :icon="reporte.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                        {{ reporte.votos_positivos }}
                                            </h5>
                                        </b-col>
                                        <b-col cols="6" class="text-center">
                                            <h5>
                                                <b-icon class="seleccionable" @click="votarReporteUsuario('negativo')" :icon="reporte.voto_usuario === 'negativo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                {{ reporte.votos_negativos }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-2">
                                        <b-col cols="12">
                                            <b-container class="contenedor_opiniones">
                                                <b-row v-for="opinion in reporte.opiniones" class="mt-1">
                                                    <b-col cols="12">
                                                            <b-container class="mt-4">
                                                                <b-row>
                                                                    <b-col cols="2" md="2">
                                                                        <b-avatar size="2rem"></b-avatar>
                                                                    </b-col>
                                                                    <b-col cols="9" md="9" style="padding: 1px">
                                                                        {{ opinion.nombre_completo_persona }}
                                                                    </b-col>
                                                                    <b-col cols="1" style="padding: 1px" v-if="opinion.usuario === requestConsultarReporteUsuario.usuario">
                                                                        <b-dropdown   variant="link" toggle-class="text-decoration-none" no-caret >
                                                                            <template #button-content>
                                                                                <b-icon icon="three-dots-vertical"></b-icon>
                                                                            </template>
                                                                            <b-dropdown-item @click="EliminarOpinion(opinion)" ><span>Eliminar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><b-icon icon="trash"/></small></span></b-dropdown-item>
                                                                        </b-dropdown>
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="justify-content-md-center m-1">
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
                                                                <b-row class="mt-2">
                                                                    <b-col cols="6" class="text-center">
                                                                        <span class="seleccionable">
                                                                            <b-icon @click="VotarOpinionUsuario(opinion,'positivo')" :icon="opinion.voto_usuario === 'positivo' ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                                                                            {{ opinion.votos_positivos }}
                                                                        </span>
                                                                    </b-col>
                                                                    <b-col cols="6" class="text-center">
                                                                        <span class="seleccionable">
                                                                            <b-icon @click="VotarOpinionUsuario(opinion,'negativo')" :icon="opinion.voto_usuario === 'negativo' ? 'hand-thumbs-down-fill' : 'hand-thumbs-down'"></b-icon>
                                                                            {{ opinion.votos_negativos }}
                                                                        </span>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-container>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-1">
                                        <b-col cols="12" class="text-right">
                                            <b-form-textarea
                                                v-model="nuevaOpinion.opinion"
                                                placeholder="Ingrese su opinión"                 
                                                rows="2"
                                            ></b-form-textarea>
                                            <b-button  @click="RegistrarOpinion" style="background-color: var(--color-primary);" class="mt-2">
                                                Enviar
                                                <b-icon icon="symmetry-horizontal"></b-icon>
                                            </b-button>
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
    import { OpinionBoundary } from '../../../../modules/opiniones/adapters/opinion.boundary';
    import { RequestRegistrarOpinionDto } from '../../../../modules/opiniones/adapters/dto/request-registrar-opinion.dto';
    import { Opinion } from '../../../../modules/opiniones/entities/opinion';
    import { VotarOpinionDto } from '../../../../modules/opiniones/adapters/dto/request-votar-opinion.dto';
    import { RequestEliminarOpinionDto } from '../../../../modules/opiniones/adapters/dto/request-eliminar-opinion.dto';
    import { votarReporteDTO } from '../dtos/votar-reporte.dto';

    export default Vue.extend({
        name: 'VerReporteUsuario',
        props: ['id'],
        data() {
            return {
                reporte: {} as ResponseConsultarReporteUsuarioDTO,
                requestConsultarReporteUsuario: {} as RequestConsultarReporteUsuarioDTO,
                nuevaOpinion: { } as RequestRegistrarOpinionDto,
                votarOpinion: {} as VotarOpinionDto,
                eliminarOpinion: {} as RequestEliminarOpinionDto,
                OpinionSeleccionada: {} as Opinion
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
                    }
                } catch (error) {
                    
                }
                
            },

            async RegistrarOpinion(){
                try {

                    this.nuevaOpinion.fk_idReporte = this.reporte.id_reporte;
                    this.nuevaOpinion.usuario = this.requestConsultarReporteUsuario.usuario;
                    this.nuevaOpinion.fecha = new Date().toLocaleDateString();

                    const respuesta = await OpinionBoundary.registrarOpinion(this.nuevaOpinion);

                    if(!respuesta.error){
                        this.reporte.opiniones = respuesta.data as Opinion[];
                    }
                    this.nuevaOpinion.opinion = '';
                } catch (error) {
                    console.log(error);
                }
            },

            async VotarOpinionUsuario(opinion: Opinion, voto: string){
                try {
                    this.votarOpinion.id_opinion = opinion.id_opinion;
                    this.votarOpinion.voto = voto;
                    this.votarOpinion.usuario = this.requestConsultarReporteUsuario.usuario;
                    this.votarOpinion.fk_idReporte = this.reporte.id_reporte;

                    const respuesta = await OpinionBoundary.votarOpinion(this.votarOpinion);

                    if(!respuesta.error){
                        this.reporte.opiniones = respuesta.data as Opinion[];
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async EliminarOpinion(opinion: Opinion){
                try {
                    this.eliminarOpinion.id_opinion = opinion.id_opinion;
                    this.eliminarOpinion.usuario = this.requestConsultarReporteUsuario.usuario;
                    this.eliminarOpinion.fk_idReporte = this.reporte.id_reporte;

                    Vue.swal({
                        title: '¿Estas seguro?',
                        text: "Se eliminara la opinión",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'var(--color-primary)',
                        cancelButtonColor: 'var(--color-secondary)',
                        cancelButtonText:'Cancelar',
                        confirmButtonText: 'Si, eliminar'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const respuesta = await OpinionBoundary.eliminarOpinion(this.eliminarOpinion);

                            if(!respuesta.error){
                                this.reporte.opiniones = respuesta.data as Opinion[];
                            }
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            },

            async votarReporteUsuario(voto: string){
                try {
                    const votarReporteDto = {
                        id_reporte : this.reporte.id_reporte,
                        voto : voto,
                        usuario : this.requestConsultarReporteUsuario.usuario
                    } as votarReporteDTO;

                    const controller = new ReporteController();
                    const respuesta = await controller.votarReporte(votarReporteDto);

                    if(!respuesta.error){
                        this.consultarReporte();
                    }
                } catch (error) {
                    
                }
            },

            seleccionarOpinion(opinion: Opinion){
                this.OpinionSeleccionada = opinion;
            }

            
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

    .opiniones{
        height: 86vh; 
        
    }

    .contenedor_opiniones{
        height: 37vh; 
        overflow-y: auto;
        overflow-x: hidden;
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

    .seleccionable{
        cursor: pointer;
    }

    .contendor_descripcion{
        height: 19vh; 
        overflow-y: auto;
    }

    .contendor_descripcion::-webkit-scrollbar {
        width: 0.5em;
    }

    .contendor_descripcion::-webkit-scrollbar-thumb {
        background-color: rgb(114, 114, 114)a7a;
        border-radius: 6px;
    }

</style>