<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Gestión de Municipios</h4>
      </b-col>
      <b-col cols="12" lg="3">
        <b-pagination
          align="fill"
          v-model="currentPage"
          :total-rows="municipios.length"
          :per-page="perPage"
          aria-controls="entity-table"
        ></b-pagination>
      </b-col>
      <b-col cols="12" lg="2">
        <b-button
          class="w-100 mb-2"
          v-b-modal.modal-registro
          style="background-color: var(--color-primary)"
        >
          <b-icon icon="plus-square-fill" />
          Agregar
        </b-button>
        <ModalRegistro @registrado="getMunicipios" />
        <ModalEditar
          :municipio="municipioSeleccionado"
          @editado="getMunicipios"
        />
      </b-col>
      <b-col cols="12" lg="7">
        <b-input-group class="mb-2">
          <b-form-input v-model="filter" placeholder="Buscar" />
          <b-input-group-append>
            <b-button disabled>
              <b-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="12" v-if="municipios.length > 0">
        <b-table
          id="entity-table"
          hover
          :items="municipios"
          :fields="[
            {
              key: 'id_municipio',
              label: 'Número',
              thStyle: { width: '5%' },
              sortable: true,
              class: 'text-center',
            },
            {
              key: 'nombre_municipio',
              label: 'Nombre',
              thStyle: { width: '35%' },
              sortable: true,
            },
            {
              key: 'nombre_entidad',
              label: 'Entidad Federativa',
              thStyle: { width: '35%' },
              sortable: true,
            },
            {
              key: 'acciones',
              label: 'Acciones',
              thStyle: { width: '10%' },
              class: 'text-center',
            },
          ]"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
        >
          <template #cell(acciones)="row">
            <b-row>
              <b-col cols="6" class="text-center">
                <b-button
                  size="sm"
                  @click="seleccionarMunicipio(row.item)"
                  v-b-modal.modal-editar
                  variant="primary"
                >
                  <b-icon icon="pencil-square" />
                </b-button>
              </b-col>
              <b-col cols="6" class="text-center">
                <b-button
                  size="sm"
                  @click="cambiarEstadoMunicipio(row.item)"
                  :style="
                    row.item.estado === 1
                      ? 'background-color: var(--color-primary)'
                      : 'background-color: var(--color-secondary)'
                  "
                >
                  <b-icon
                    :icon="row.item.estado === 1 ? 'check-circle' : 'x-circle'"
                  />
                </b-button>
              </b-col>
            </b-row>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" v-else>
        <b-card>
          <b-card-text class="text-center">
            No hay Municipios registrados
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

      filter: "" as string,

      currentPage: 1,
      perPage: 10,
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
        Vue.swal({
          title: "¿Estas seguro?",
          text: `¿Deseas ${
            municipio.estado === 1 ? "desactivar" : "activar"
          } el municipio ${municipio.nombre_municipio}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelaar",
          confirmButtonText: `Si, ${
            municipio.estado === 1 ? "desactivar" : "activar"
          }`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            municipio.estado = municipio.estado === 1 ? 0 : 1;

            const controlador = new MunicipioController();
            const respuesta = await controlador.cambiarEstadoMunicipio(
              municipio
            );

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Éxito!",
                text: `Se ha ${
                  municipio.estado === 1 ? "activado" : "desactivado"
                } el municipio ${municipio.nombre_municipio}`,
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
                confirmButtonText: "Aceptar",
              });
              this.getMunicipios();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getMunicipios();
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
  font-weight: bold;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}
</style>
