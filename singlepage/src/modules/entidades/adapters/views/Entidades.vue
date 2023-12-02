<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Gestión de Entidades Federativas</h4>
      </b-col>
      <b-col cols="6">
        <b-button v-b-modal.modal-registro variant="primary" class="mb-2">
          <b-icon class="mx-2" icon="plus-square-fill" />
          Agregar
        </b-button>
        <ModalRegistro @registrado="getEntidades" />
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
      <b-col cols="12" v-if="entidades.length > 0">
        <b-card
          v-for="entidad in entidades"
          :key="entidad.id_entidad"
          class="my-1"
        >
          <b-row>
            <b-col cols="1">
              <div class="id-box rounded">
                {{ entidad.id_entidad }}
              </div>
            </b-col>
            <b-col cols="9">
              <b-card-text class="gray-box rounded">
                {{ entidad.nombre_entidad }}
              </b-card-text>
            </b-col>
            <b-col class="text-center" cols="2">
              <b-row>
                <b-col cols="4">
                  <b-button v-b-modal.modal-registro variant="primary">
                    <b-icon icon="pencil-square" />
                  </b-button>
                </b-col>
                <b-col cols="4">
                  <b-button variant="danger">
                    <b-icon icon="trash" />
                  </b-button>
                </b-col>
                <b-col cols="4">
                  <b-button
                    :variant="entidad.estado === 1 ? 'success' : 'warning'"
                  >
                    <b-icon
                      :icon="entidad.estado === 1 ? 'check-circle' : 'x-circle'"
                    />
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
            No hay entidades federativas registradas
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import { EntidadFederativa } from "../../entities/entidad-federativa";
import { EntidadFederativaController } from "../entidad-federativa.controller";

export default Vue.extend({
  name: "Entidades",
  components: {
    ModalRegistro: defineAsyncComponent(
      () => import("./components/ModalRegistro.vue")
    ),
  },
  data() {
    return {
      // Entidades
      entidades: [] as EntidadFederativa[],
    };
  },
  methods: {
    async getEntidades() {
      try {
        const controlador = new EntidadFederativaController();
        const respuesta = await controlador.obtenerEntidadesFederativas();

        if (!respuesta.error) {
          this.entidades = respuesta.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getEntidades();
  },
});
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
  display: flex;
  height: 100%;
  justify-content: center;
  width: 50%;
}
</style>
