<template>
    <b-modal id="recuperarContra" hide-footer title="Recuperar contraseña" centered @hidden="cerrarModal()">
        <b-row v-if="estado===1">
            <b-col cols="12">
                <b-form-group label="Ingrese su usuario">
                    <b-form-input
                        v-model="inputUsuario.usuario"
                        @input="validarInputUsuario"
                        :state="validaciones.inputUsuario.estadoUsuario"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="12" class="text-right mt-2">
                <b-button :disabled="!validaciones.inputUsuario.validacion"  style="background-color: var(--color-primary);" @click="buscarUsuario">Enviar</b-button>
            </b-col>
        </b-row>
        <b-row v-if="estado===2">
            <b-col cols="12">
                <small>Se ha enviado un código a su correo electrónico asociado.</small> 
            </b-col>
            <b-col cols="12" class="mt-3">
                <b-form-group label="Ingrese el codigo">
                    <b-form-input
                        v-model="inputUsuario.codigo"
                        @input="validarInputCodigo"
                        :state="validaciones.inputCodigo.estadoCodigo"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="12" class="text-right mt-2">
                <b-button :disabled="!validaciones.inputCodigo.validacion"  style="background-color: var(--color-primary);" @click="verificarCodigo()">Enviar</b-button>
            </b-col>

        </b-row>
        <b-row v-if="estado===3">
            <b-col cols="12">
                <small>-La contraseña debe tener un minimo de una mayúscula, una minúscula y un número</small>
                <small><br/>-La contraseña debe tener un minimo de 8 caracteres</small> 
            </b-col>
            <b-col cols="12" class="mt-3">
                <b-form-group label="Nueva contraseña">
                    <b-form-input
                        v-model="recuperarContrasena.nueva_contraseña"
                        @input="validarInputNuevaContrasena"
                        :state="validaciones.inputContrasena.nuevaContraseña.estadoNuevaContraseña"
                        type="password"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="12" class="mt-3">
                <b-form-group label="Confirmar contraseña">
                    <b-form-input
                        v-model="recuperarContrasena.confirmar_contraseña"
                        @input="validarInputNuevaContrasena"
                        :state="validaciones.inputContrasena.confirmarContraseña.estadoConfirmarContraseña"
                        type="password"
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="12" class="text-right mt-2">
                <b-button :disabled="!validaciones.inputContrasena.nuevaContraseña.validacion || !validaciones.inputContrasena.confirmarContraseña.validacion"  style="background-color: var(--color-primary);" @click="recuperarContraseaa()"  >Enviar</b-button>
            </b-col>

        </b-row>
    </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { AutenticacionController } from '../../autenticacion.controller';
import { registrarCodigoUsuarioDto } from '../../dtos/registrar-codigo-usuario.dto';
import { RecuperarContraseñaDto } from '../../dtos/recuperar-contraseña.dto';
import { regexValidationAlMenosUnaMayuscula, regexValidationUnAlMenosNumero, regexValidationUnaAlMenosMinuscula, validateRegex } from '../../../../../config/validations';
    
    export default Vue.extend({
        name: 'RecuperarContraseña',
        data() {
            return {
                estado: 1,

                validaciones:{
                    inputUsuario:{
                        estadoUsuario: null as boolean | null,
                        validacion: false,
                    },
                    inputCodigo:{
                        estadoCodigo: null as boolean | null,
                        validacion: false,
                    },
                    inputContrasena:{
                        nuevaContraseña:{
                            estadoNuevaContraseña: null as boolean | null,
                            validacion: false,
                        },
                        confirmarContraseña:{
                            estadoConfirmarContraseña: null as boolean | null,
                            validacion: false,

                        },
                    },
                },

                inputUsuario:{
                    usuario:'',
                    codigo:''
                } as registrarCodigoUsuarioDto,

                recuperarContrasena:{
                    nueva_contraseña:'',
                    confirmar_contraseña:'',
                    usuario:'',
                } as RecuperarContraseñaDto


            }
        },
        methods: {
            aumentarEstado(){
                this.estado++
            },
            cerrarModal(){
                this.estado=1
                this.validaciones.inputUsuario.estadoUsuario = null
                this.validaciones.inputUsuario.validacion = false

                this.validaciones.inputCodigo.estadoCodigo = null
                this.validaciones.inputCodigo.validacion = false

                this.inputUsuario.usuario=''
                this.inputUsuario.codigo=''

                this.validaciones.inputContrasena.nuevaContraseña.estadoNuevaContraseña = null
                this.validaciones.inputContrasena.nuevaContraseña.validacion = false

                this.validaciones.inputContrasena.confirmarContraseña.estadoConfirmarContraseña = null
                this.validaciones.inputContrasena.confirmarContraseña.validacion = false

                this.recuperarContrasena.nueva_contraseña=''
                this.recuperarContrasena.confirmar_contraseña=''
                this.recuperarContrasena.usuario=''

            },

            //ESTADO 1
            //validaciones
            validarInputUsuario(){
                if(this.inputUsuario.usuario.length === 0 || this.inputUsuario.usuario === null || this.inputUsuario.usuario === undefined){
                    this.validaciones.inputUsuario.estadoUsuario = false;
                    this.validaciones.inputUsuario.validacion = false;
                }else{
                    this.validaciones.inputUsuario.estadoUsuario = true;
                    this.validaciones.inputUsuario.validacion = true;
                }
            },

            //funciones
            async buscarUsuario(){
                try {
                    const controlador = new AutenticacionController();
                    const respuesta = await controlador.registrarCodigo(this.inputUsuario);

                    if(respuesta.data){
                        this.aumentarEstado()
                    }
                    
                } catch (error) {
                }
            },

            //ESTADO 2
            //validaciones
            validarInputCodigo(){
                if(this.inputUsuario.codigo.length === 0 || this.inputUsuario.codigo === null || this.inputUsuario.codigo === undefined){
                    this.validaciones.inputCodigo.estadoCodigo = false;
                    this.validaciones.inputCodigo.validacion = false;
                }else{
                    this.validaciones.inputCodigo.estadoCodigo = true;
                    this.validaciones.inputCodigo.validacion = true;
                }
            },

            //funciones
            async verificarCodigo(){
                try {
                    const controlador = new AutenticacionController();
                    const respuesta = await controlador.verificarCodigo(this.inputUsuario);

                    if(respuesta.data){
                        this.aumentarEstado()
                    }
                    
                } catch (error) {
                }
            },

            //ESTADO 3
            //validaciones
            validarInputNuevaContrasena(){
                if(this.recuperarContrasena.nueva_contraseña.length < 8 || this.recuperarContrasena.nueva_contraseña === null || this.recuperarContrasena.nueva_contraseña === undefined){
                    this.validaciones.inputContrasena.nuevaContraseña.estadoNuevaContraseña = false;
                    this.validaciones.inputContrasena.nuevaContraseña.validacion = false;
                }else{
                    if(this.recuperarContrasena.nueva_contraseña === this.recuperarContrasena.confirmar_contraseña){
                        this.validaciones.inputContrasena.nuevaContraseña.estadoNuevaContraseña = true;
                        this.validaciones.inputContrasena.nuevaContraseña.validacion = true;

                        this.validaciones.inputContrasena.confirmarContraseña.estadoConfirmarContraseña = true;
                        this.validaciones.inputContrasena.confirmarContraseña.validacion = true;
                    }else{
                        this.validaciones.inputContrasena.nuevaContraseña.estadoNuevaContraseña = false;
                        this.validaciones.inputContrasena.nuevaContraseña.validacion = false;
                    }
                }
            },

            //funciones
            async recuperarContraseaa(){
                try {
                    this.recuperarContrasena.usuario = this.inputUsuario.usuario

                    const controlador = new AutenticacionController();
                    const respuesta = await controlador.recuperarContraseña(this.recuperarContrasena);

                    if(respuesta.data){
                        Vue.swal({
                            title: 'Contraseña actualizada',
                            text: "Se ha actualizado su contraseña",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: 'var(--color-primary)',
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$bvModal.hide('recuperarContra')
                            }
                        })
                    }
                    
                } catch (error) {
                }
            },


            
        },
        mounted() {
            
        },
    });
</script>
