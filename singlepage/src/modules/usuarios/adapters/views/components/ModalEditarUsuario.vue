<template>
    <b-modal
      id="ModalEditarUsuario"
      centered
      title="Editar Nombre de Usuario"
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
      ok-title="Guardar"
      ok-variant="success"
      cancel-title="Cancelar"
      cancel-variant="danger"
      @ok="editarNombreUsuario"
      @cancel="cancelarEdicion"
    >
      <b-form @submit.prevent="editarNombreUsuario">
        <b-form-group label="Nuevo Nombre de Usuario">
          <b-form-input v-model="nuevoNombreUsuario" placeholder="Nuevo Nombre" required />
        </b-form-group>
        <b-form-group label="Nueva Contraseña">
          <b-form-input v-model="nuevaContrasena" placeholder="Nueva Contraseña" required />
        </b-form-group>
      </b-form>
    </b-modal>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { ModificarCuentaDTO } from "../../../adapters/dtos/modificar-cuenta.dto";
  import { UsuarioController } from "../../../adapters/usuario.controller";
  
  export default Vue.extend({
    name: "ModalEditarUsuario",
    props: {
      usuario: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        nuevoNombreUsuario: "",
        nuevaContrasena: "",
      };
    },
    methods: {
      async editarNombreUsuario() {
        try {
          const controlador = new UsuarioController();
          const payload: ModificarCuentaDTO = {
            usuario: this.nuevoNombreUsuario,
            contrasena: this.nuevaContrasena,
          };
  

          const respuesta = await controlador.modificarUsuario(payload);

  
          if (!respuesta.error) {
            Vue.swal({
              title: "¡Nombre de usuario editado!",
              text: `El nombre de usuario ha sido editado correctamente.`,
              icon: "success",
              confirmButtonColor: "var(--color-primary)",
              confirmButtonText: "Aceptar",
            });
            this.$emit("editado");
            this.$bvModal.hide("modal-editar-nombre-usuario");
          }
        } catch (error) {
          console.log(error);
        }
      },
  
      cancelarEdicion() {
        this.nuevoNombreUsuario = "";
        this.$bvModal.hide("modal-editar-nombre-usuario");
      },
    },
  });
  </script>
  
  <style scoped>
  </style>
  