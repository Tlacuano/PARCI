<template>
    <b-tab title="Editar información">
      <div>
        <h5 class="mt-4">Editar información del usuario</h5>
  
        <!-- Mostrar información original del usuario -->
        <div class="mb-4">
          <p>Usuario: {{ nombreUsuario }}</p>
          <p>Contraseña: *********</p>
        </div>
  
        <!-- Formulario para introducir nueva información -->
        <b-form @submit.prevent="confirmarEdicion">
          <b-form-group label="Nuevo Usuario">
            <b-input v-model="nuevoUsuario" placeholder="Introduce el nuevo usuario" required></b-input>
          </b-form-group>
  
          <b-form-group label="Nueva Contraseña">
            <b-input
              v-model="nuevaContraseña"
              type="password"
              placeholder="Introduce la nueva contraseña"
              required
            ></b-input>
          </b-form-group>
  
          <!-- Botones de acción -->
          <div class="d-flex justify-content-between">
            <b-button variant="success" type="submit">Guardar cambios</b-button>
            <b-button variant="secondary" @click="cancelarEdicion">Cancelar</b-button>
          </div>
        </b-form>
      </div>
    </b-tab>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { UsuarioController } from "../../usuario.controller";
  import {ModificarCuentaDTO} from "../../dtos/modificar-cuenta.dto";
  
  export default Vue.extend({
    name: "EditarUsuario",
    data() {
      return {
        nombreUsuario: localStorage.getItem("nombreUsuario")!,
        usuarioId: Number(localStorage.getItem("usuarioId")),
        nuevoUsuario: "",
        nuevaContraseña: "",
      };
    },
    methods: {
      async confirmarEdicion() {
        try {
          // Lógica para guardar la nueva información del usuario
          const editarUsuarioDTO: ModificarCuentaDTO = {
          id_usuario: this.usuarioId,
          contrasena: this.nuevaContraseña,
          };

  
          const controlador = new UsuarioController();
          const respuesta = await controlador.modificarUsuario(editarUsuarioDTO);
  
          if (!respuesta.error) {
            await Vue.swal({
              title: "¡Cambios guardados!",
              text: "Tu información ha sido actualizada exitosamente.",
              icon: "success",
              confirmButtonColor: "var(--color-primary)",
            });
            // Actualizar la información del usuario y redirigir si es necesario
            this.nombreUsuario = this.nuevoUsuario;
          }
        } catch (error) {
          console.error("Error al editar la información del usuario:", error);
        }
      },
  
      cancelarEdicion() {
        // Puedes agregar lógica adicional si es necesario
      },
    },
  });
  </script>
  
  <style scoped>
  /* Puedes agregar estilos específicos para este componente si es necesario */
  </style>
  