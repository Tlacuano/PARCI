<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Gestión de Entidades Federativas</h4>
      </b-col>
      <b-col cols="12" lg="3">
        <b-pagination
          align="fill"
          v-model="currentPage"
          :total-rows="entidades.length"
          :per-page="perPage"
          aria-controls="entity-table"
        ></b-pagination>
      </b-col>
      <b-col cols="12" lg="2">
        <b-button class="w-100 mb-2" v-b-modal.modal-registro style="background-color: var(--color-primary)">
          <b-icon icon="plus-square-fill" />
          Agregar
        </b-button>
        <ModalRegistro @registrado="getEntidades" />
        <ModalEditar :entidad="entidadSeleccionada" @editado="getEntidades" />
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
      <b-col cols="12" v-if="entidades.length > 0">
        <b-table
          id="entity-table"
          hover
          :items="entidades"
          :fields="[
            {
              key: 'id_entidad',
              label: 'Número',
              thStyle: { width: '5%' },
              sortable: true,
              class: 'text-center',
            },
            {
              key: 'nombre_entidad',
              label: 'Nombre',
              thStyle: { width: '85%' },
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
                <b-button size="sm" @click="seleccionarEntidad(row.item)" v-b-modal.modal-editar variant="primary">
                  <b-icon icon="pencil-square" />
                </b-button>
              </b-col>
              <b-col cols="6" class="text-center">
                <b-button
                  size="sm"
                  @click="cambiarEstadoEntidad(row.item)"
                  :style="
                    row.item.estado === 1
                      ? 'background-color: var(--color-primary)'
                      : 'background-color: var(--color-secondary)'
                  "
                >
                  <b-icon :icon="row.item.estado === 1 ? 'check-circle' : 'x-circle'" />
                </b-button>
              </b-col>
            </b-row>
          </template>
        </b-table>
      </b-col>
      <b-col cols="12" v-else>
        <b-card>
          <b-card-text class="text-center"> No hay entidades federativas registradas </b-card-text>
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
    ModalRegistro: defineAsyncComponent(() => import("./components/ModalRegistro.vue")),
    ModalEditar: defineAsyncComponent(() => import("./components/ModalEditar.vue")),
  },
  data() {
    return {
      // Entidades
      entidades: [] as EntidadFederativa[],
      entidadSeleccionada: {} as EntidadFederativa,

      // Filtros
      filter: "" as string,

      // Paginación
      currentPage: 1,
      perPage: 10,
    };
  },

  watch: {
    filter(newFilter: string) {
      this.currentPage = 1;
      this.$refs["entity-table"].filter(newFilter);
    },
  },

  methods: {
    // Seleccionar entidad federativa
    seleccionarEntidad(entidad: EntidadFederativa) {
      this.entidadSeleccionada = { ...entidad };
    },

    // Obtener entidades federativas
    async getEntidades() {
      this.entidades = [];
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

    // Cambiar estado de entidad federativa
    async cambiarEstadoEntidad(entidad: EntidadFederativa) {
      try {
        Vue.swal({
          title: "¿Estas seguro?",
          text: `¿Deseas ${entidad.estado === 1 ? "desactivar" : "activar"} la entidad federativa ${
            entidad.nombre_entidad
          }?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: `Si, ${entidad.estado === 1 ? "desactivar" : "activar"}`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            entidad.estado = entidad.estado === 1 ? 0 : 1;

            const controlador = new EntidadFederativaController();
            const respuesta = await controlador.cambiarEstadoEntidadFederativa(entidad);

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Éxito!",
                text: `Se ha ${entidad.estado === 1 ? "activado" : "desactivado"} la entidad federativa ${
                  entidad.nombre_entidad
                }`,
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
                confirmButtonText: "Aceptar",
              });
              this.getEntidades();
            }
          }
        });
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

<style scoped></style>
