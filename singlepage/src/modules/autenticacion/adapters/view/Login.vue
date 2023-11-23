<template>
    <b-container class="centenedor">
        <b-row class="centenedor" align-v="center">
            <b-col>
                <b-card class="sombra" @keyup.enter="iniciarSesion">
                    <b-row align-v="center">
                        <b-col md="6" class="d-none d-md-block">
                            <img src="https://etcetera.com.mx/wp-content/uploads/2019/12/guiaimagen.jpg" alt="logo" class="img-fluid">
                        </b-col>
                        <b-col md="6" sm="12">
                            <b-container>
                                <b-row>
                                    <b-col cols="12" class="text-center mt-3">
                                        <h3>Bienvenido</h3>
                                    </b-col>
                                    <b-col cols="12">
                                        <b-form-group label="Usuario" class="mt-4">
                                            <b-form-input v-model="formulario.usuario"></b-form-input>
                                        </b-form-group>
            
                                        <b-form-group label="Contraseña" class="mt-4">
                                            <b-input-group>
                                                <b-form-input 
                                                :type="showPassword ? 'text' : 'password'"
                                                v-model="formulario.contraseña">
                                                </b-form-input>
                                                <b-input-group-append>
                                                    <b-button @click="togglePasswordVisibility" variant="secondary">
                                                        <b-icon :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'"></b-icon>
                                                    </b-button>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" class="text-center mt-5">
                                        <b-button variant="primary"  @click="iniciarSesion">Iniciar Sesión</b-button>
                                    </b-col>
                                    <b-col cols="12" class="text-center my-4">
                                        <b-row>
                                            <b-col cols="12" md="6">
                                                <b-button variant="link">Olvide mi contraseña</b-button>
                                            </b-col>
                                            <b-col cols="12" md="6">
                                                <b-button variant="link">Registrate</b-button>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-container>                            
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
        
</template>

<script lang="ts">
    import Vue from 'vue';
    import {inicioSesionDto} from '../dtos/inicio-sesion.dto';
import { AutenticacionController } from '../autenticacion.controller';
import { cambioPersonalizacion } from '@/kernel/cambioPersonalizacion';

    export default Vue.extend({
        name: 'Login',
        data() {
            return {
                formulario: {
                    usuario: '',
                    contraseña: ''
                } as inicioSesionDto,

                showPassword: false
            }
        },
        methods: {
            togglePasswordVisibility() {
                this.showPassword = !this.showPassword;
            },

            async iniciarSesion(){
                try {
                    const controlador = new AutenticacionController();
                    const respuesta = await controlador.inisioSesion(this.formulario);
                    
                    if(!respuesta.error){
                        localStorage.setItem('token', respuesta.data.token);
                        localStorage.setItem('personalizacion', JSON.stringify(respuesta.data.personalizacion));
                        localStorage.setItem('usuario', JSON.stringify({
                            usuario: respuesta.data.usuario,
                            rol: respuesta.data.rol,
                            municipio: respuesta.data.municipio
                        }));

                        cambioPersonalizacion(respuesta.data.personalizacion);

                        this.$router.push('/');
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
</script>

<style>
    .sombra{
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .centenedor{
        height: 100vh;
    }

</style>
