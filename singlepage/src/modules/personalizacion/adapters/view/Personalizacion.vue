<template>
    <b-container fluid class="mt-4">

        <b-row>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col>
                            <h1>Configuración</h1>
                        </b-col>
                    </b-row>
                    <hr/>
                    <b-row class="mt-3">
                        <b-col>
                            <h4>Personalización</h4>
                        </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col cols="12" md="6">
                            <b-form-group label="Tema">
                                <b-form-select v-model="configuracion.tema" :options="temas" @change="cambiarPersonalizacion"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group label="Tamaño de letra">
                                <b-form-select v-model="configuracion.tamaño_letra" :options="tamaños" @change="cambiarPersonalizacion"></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col cols="12" class="text-right">
                            <b-button style="background-color: var(--color-primary);" @click="guardarConfiguracion">Guardar</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import { cambioPersonalizacion } from '../../../../kernel/cambioPersonalizacion';

import Vue from 'vue';
import { Personalizacion } from '../../entities/personalizacion';
    export default Vue.extend({
        name: 'Configuracion',
        data() {
            return {
                configuracion:{
                    tema: '',
                    tamaño_letra:''
                } as Personalizacion,
                temas: [
                    { value: 'Claro', text: 'Claro' },
                    { value: 'Oscuro', text: 'Oscuro' }
                ],
                tamaños: [
                    { value: 'Chica', text: 'Chica' },
                    { value: 'Mediana', text: 'Mediana' },
                    { value: 'Grande', text: 'Grande' }
                ]
                
            }
        },
        methods: {
            guardarConfiguracion(){
                
            },
            obtenerPersonalizacion(){
                const personalizacionString = localStorage.getItem('personalizacion');
                const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

                this.configuracion = personalizacion;                
            },
            cambiarPersonalizacion(){
                localStorage.setItem('personalizacion', JSON.stringify(this.configuracion));
                cambioPersonalizacion(this.configuracion);
            }
            
        },
        mounted() {
            this.obtenerPersonalizacion();
        },
    });
</script>