<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Gestión de Categorias</h4>
      </b-col>
      <b-col cols="12" lg="3">
        <b-pagination
          align="fill"
          v-model="currentPage"
          :total-rows="categorias.length"
          :per-page="perPage"
          aria-controls="entity-table"
        >
        </b-pagination>
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
        <ModalRegistro @registrado="getCategorias" />
        <ModalEditar
          :categoria="categoriaSeleccionada"
          @editado="getCategorias"
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
      <b-col cols="12" v-if="categorias.length > 0">
        <b-table
          id="entity-table"
          hover
          :items="categorias"
          :fields="[
            {
              key: 'id_categoria',
              label: 'Número',
              thStyle: { width: '5%' },
              sortable: true,
              class: 'text-center',
            },
            {
              key: 'nombre_categoria',
              label: 'Nombre',
              thStyle: { width: '55%' },
              sortable: true,
            },
            {
              key: 'color',
              label: 'Color identificador',
              thStyle: { width: '30%' },
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
                  @click="seleccionarCategoria(row.item)"
                  v-b-modal.modal-editar
                  variant="primary"
                >
                  <b-icon icon="pencil-square" />
                </b-button>
              </b-col>
              <b-col cols="6" class="text-center">
                <b-button
                  size="sm"
                  @click="cambiarEstadoCategoria(row.item)"
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
            No hay categorias registradas
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import { categoria } from "../../entities/categoria";
import { CategoriaController } from "../categoria.controller";

export default Vue.extend({
  name: "Categorias",

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
      //Categorias
      categorias: [] as categoria[],
      categoriaSeleccionada: {} as categoria,
      //Filtros
      filter: "" as string,
      //Paginacion
      currentPage: 1,
      perPage: 10,
    };
  },

  methods: {
    //Seleccionar categoria
    seleccionarCategoria(categoria: categoria) {
      this.categoriaSeleccionada = { ...categoria };
    },

    //Obtener categorias
    async getCategorias() {
      this.categorias = [];
      try {
        const controller = new CategoriaController();
        const response = await controller.getCategorias();

        if (!response.error) {
          this.categorias = response.data!;
          console.log(this.categorias);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //Cambiar estado de categoria
    async cambiarEstadoCategoria(categoria: categoria) {
      try {
        Vue.swal({
          title: "¿Estas seguro?",
          text: `Deseas ${
            categoria.estado === 1 ? "desactivar" : "activar"
          } la categoria ${categoria.nombre_categoria}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: `Si, ${
            categoria.estado === 1 ? "desactivar" : "activar"
          }`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            categoria.estado = categoria.estado === 1 ? 0 : 1;
            const controlador = new CategoriaController();
            const respuesta = await controlador.cambiarEstadoCategoria(
              categoria
            );

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Éxito!",
                text: `Se ha ${
                  categoria.estado === 1 ? "activado" : "desactivado"
                } la categoria ${categoria.nombre_categoria}`,
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
                confirmButtonText: "Aceptar",
              }),
                this.getCategorias();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getCategorias();
  },
});
</script>

<style scoped></style>
