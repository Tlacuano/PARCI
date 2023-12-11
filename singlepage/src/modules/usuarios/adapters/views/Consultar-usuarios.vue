<template>
    <b-container fluid class="mt-4">
      <b-row>
        <b-col cols="12">
          <h4 class="mb-4">Gestión de Usuarios</h4>
        </b-col>
        <b-col cols="12" lg="3">
          <b-pagination
            align="fill"
            v-model="currentPage"
            :total-rows="usuarios.length"
            :per-page="perPage"
            aria-controls="user-table"
          ></b-pagination>
        </b-col>
        <b-col cols="12" lg="2">
          <b-button class="w-100 mb-2" v-b-modal.modal-registro style="background-color: var(--color-primary)">
            <b-icon icon="plus-square-fill" />
            Agregar
          </b-button>
          <ModalRegistro @registrado="getUsuarios" />
          <ModalEditar :usuario="usuarioSeleccionado" @editado="getUsuarios" />
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
        <b-col cols="12" v-if="usuarios.length > 0">
          <b-table
            id="user-table"
            hover
            :items="usuarios"
            :fields="[
              {
                key: 'id_usuario',
                label: 'Número',
                thStyle: { width: '5%' },
                sortable: true,
                class: 'text-center',
              },
              {
                key: 'usuario',
                label: 'Nombre de Usuario',
                thStyle: { width: '40%' },
                sortable: true,
              },
              {
                key: 'rol',
                label: 'Rol',
                thStyle: { width: '30%' },
                sortable: true,
              },
              {
                key: 'acciones',
                label: 'Acciones',
                thStyle: { width: '25%' },
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
                  <b-button size="sm" @click="seleccionarUsuario(row.item)" v-b-modal.ModalEditarUsuario variant="primary">
                    <b-icon icon="pencil-square" />
                  </b-button>
                </b-col>
                <b-col cols="6" class="text-center">
                  <b-button size="sm" @click="eliminarUsuario(row.item)"  >
                    <b-icon icon="trash" />
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-col>
        <b-col cols="12" v-else>
          <b-card>
            <b-card-text class="text-center"> No hay usuarios registrados </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script lang="ts">
  import Vue, { defineAsyncComponent } from "vue";
  import { Usuario } from "../../entities/usuario";
  import { UsuarioController } from "../usuario.controller";
  
  export default Vue.extend({
    name: "GestionUsuarios",
    components: {
        ModalRegistro: defineAsyncComponent(() => import("./components/RegistrarUsuarioNuevo.vue")),
      ModalEditar: defineAsyncComponent(() => import("./components/ModalEditarUsuario.vue")),
    },
    data() {
      return {
        usuarios: [] as Usuario[],
        usuarioSeleccionado: {} as Usuario,
  
        filter: "" as string,
  
        currentPage: 1,
        perPage: 10,
      };
    },
  
    watch: {
      filter(newFilter: string) {
        this.currentPage = 1;
        this.$refs["user-table"].filter(newFilter);
      },
    },
  
    methods: {
      // Seleccionar usuario
      seleccionarUsuario(usuario: Usuario) {
        this.usuarioSeleccionado = { ...usuario };
      },
  
      // Obtener usuarios
      async getUsuarios() {
        this.usuarios = [];
        try {
          const controlador = new UsuarioController();
          const respuesta = await controlador.obtenerUsuarios();
  
          if (!respuesta.error) {
            this.usuarios = respuesta.data;
          }
        } catch (error) {
          console.log(error);
        }
      },
  
      async eliminarUsuario(usuario: Usuario) {
        try {
          Vue.swal({
            title: "¿Estas seguro?",
            text: `¿Deseas eliminar al usuario ${usuario.usuario}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--color-danger)",
            cancelButtonColor: "var(--color-secondary)",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const controlador = new UsuarioController();
              const respuesta = await controlador.eliminarUsuario(usuario);
  
              if (!respuesta.error) {
                Vue.swal({
                  title: "¡Éxito!",
                  text: `Se ha eliminado al usuario ${usuario.usuario}`,
                  icon: "success",
                  confirmButtonColor: "var(--color-primary)",
                  confirmButtonText: "Aceptar",
                });
                this.getUsuarios();
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
    mounted() {
      this.getUsuarios();
    },
  });
  </script>
  
  <style scoped></style>
  