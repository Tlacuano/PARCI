<template>
    <b-modal id="registrar-reporte" size="lg"  centered hideFooter title="Registrar reporte">
        <b-container fluid>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Titulo:">
                        <b-form-input placeholder="Ingrese el nombre del reporte"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Descripción:">
                        <b-form-textarea placeholder="Ingrese la descripción del reporte"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'RegistrarReporte',
        components: {
            
        },
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        mounted() {
            
        },
    });
</script>