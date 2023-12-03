<template>
    <div>
        <h1>VerReporteUsuario</h1>
        {{ hola  }}
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'VerReporteUsuario',
        props: ['id'],
        data() {
            return {
                hola: this.id!
            }
        },
        methods: {
            getTraining(){
                console.log(this.$props);
                
            }
            
        },
        mounted() {
            this.getTraining();
        },
    });
</script>