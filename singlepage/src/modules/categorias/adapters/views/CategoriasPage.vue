<template>
    <div>
        <h1>Categorias</h1>
        <div class="contenedor-categorias">
            <b-table striped hover :items="categorias"></b-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { categoria } from '../../entities/categoria';
import { CategoriaController } from '../categoria.controller';

export default Vue.extend({
    name: "CategoriaLista",
    data() {
        return {
            categorias: [] as categoria[],
        };
    },

    methods: {
        async getCategorias() {
            try {
                const controller = new CategoriaController();
                const response = await controller.getCategorias();

                if(!response.error) {
                    this.categorias = response.data!;
                } else {
                    console.log(response.error);
                }

            } catch (error) {
                console.log(error);
            }
        }
    },

    mounted() {
        this.getCategorias();
    }

});
</script>