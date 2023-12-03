<template>
    <b-container fluid class="mt-4">
        <b-row>
            <b-col cols="12">
                <h4 class="mb-4">Gestión de Municipios</h4>
            </b-col>
            <b-col cols="6">
                <b-button v-b-modal.modal-registro variant="primary" class="mb-2">
                    <b-icon class="mx-2" icon="plus-square-fill" />
                    Agregar
                </b-button>
                <ModalRegistro @registrado="getMunicipios" />
                <ModalEditar :municipio="municipioSeleccionado" @editado="getMunicipios" />
            </b-col>
            <b-col cols="6">
                <b-input-group class="mb-2">
                    <b-form-input placeholder="Buscar" />
                    <b-input-group-append>
                        <b-button variant="secondary">
                            <b-icon icon="search" />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col col="12" v-if="municipios.length > 0">
                <b-card v-for="municipio in municipios" :key="municipio.id_municipio" class="my-1">
                    <b-row>
                        <b-col cols="1">
                            <div class="id-box rounded">
                                {{ municipio.id_municipio }}
                            </div>
                        </b-col>
                        <b-col cols="10">
                            <div class="gray-box rounded">
                                {{ municipio.nombre_municipio }}
                            </div>
                        </b-col>
                        <b-col class="text-center" cols="1">
                            <b-row>
                                <b-col cols="6">
                                    <b-button @click="seleccionarMunicipio(municipio)" v-b-modal.modal-editar
                                        variant="primary">
                                        <b-icon icon="pencil-square" />
                                    </b-button>
                                </b-col>
                                <b-col cols="6">
                                    <b-button @click="cambiarEstadoMunicipio(municipio)"
                                        :variant="municipio.estado === 1 ? 'success' : 'warning'">
                                        <b-icon :icon="municipio.estado === 1 ? 'check-circle' : 'x-circle'" />
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col cols="12" v-else>
                <b-card>
                    <b-card-text class="text-center">
                        No hay municipios registrados
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import { Municipio } from "../../entities/municipio";
import { MunicipioController } from "../municipio.controller";

export default Vue.extend({
    name: "Municipios",

    components: {
        ModalRegistro: defineAsyncComponent(
            () => import("./components/ModalRegistro.vue")
        ),
        ModalEditar: defineAsyncComponent(
            () => import("./components/ModalEditar.vue")
        ),
    },
    data() {
        return {
            municipios: [] as Municipio[],
            municipioSeleccionado: {} as Municipio,
        };
    },

    methods: {
        seleccionarMunicipio(municipio: Municipio) {
            this.municipioSeleccionado = { ...municipio };
        },

        async getMunicipios() {
            this.municipios = [];

            try {
                const controlador = new MunicipioController();
                const respuesta = await controlador.getMunicipios();

                if (!respuesta.error) {
                    this.municipios = respuesta.data;
                }

            } catch (error) {
                console.log(error);
            }
        },

        async cambiarEstadoMunicipio(municipio: Municipio) {
            try {
                municipio.estado = municipio.estado === 1 ? 0 : 1;

                const controlador = new MunicipioController();
                const respuesta = await controlador.cambiarEstadoMunicipio(municipio);

                if (!respuesta.error) {
                    this.$bvToast.toast("El estado del Municipio se ha actualizado", {
                        title: "Éxito",
                        variant: "success",
                        solid: true,
                    });
                    this.getMunicipios();
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    mounted() {
        this.getMunicipios();
    }
})
</script>

<style scoped>
.card-body {
    padding: 0.5rem 1rem;
}

.gray-box {
    background-color: #cecece;
    color: black;
    padding: 0.5rem 1rem;
}

.id-box {
    align-items: center;
    background-color: #cecece;
    color: black;
    font-weight: bold;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}
</style>