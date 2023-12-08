<template>
    <b-tab title="Eliminar cuenta">
      <div>
        <h5 class="mt-4">Eliminar cuenta de usuario</h5>
        <p class="mb-4">¿Estás seguro de que deseas eliminar tu cuenta?</p>
        <p class="mb-4">Esta accion es irreversible, los datos asociados con la cuenta seran eliminados</p>

        <!-- Botones de acción -->
        <div class="d-flex justify-content-between">
          <b-button
            variant="danger"
            @click="confirmarEliminacion"
          >
            Eliminar cuenta
          </b-button>
          <b-button variant="secondary" @click="cancelarEliminacion">
            Cancelar
          </b-button>
        </div>
      </div>
    </b-tab>
  </template>
  <script lang="ts">
  import Vue from "vue";
  import { UsuarioController } from "../../usuario.controller";
import { EliminarUsuarioDTO } from "../../dtos/eliminar-usuario.dto";
  
  export default Vue.extend({
    name: "EliminarUsuario",
    data() {
      return {
        idUsuario: localStorage.getItem("idUsuario")! as unknown as EliminarUsuarioDTO,
      };
    },
    methods: {
      async confirmarEliminacion() {
        try {


          await Vue.swal({
            title: "Eliminar cuenta",
            text: "¿Estás seguro de que deseas eliminar tu cuenta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--color-danger)",
            cancelButtonColor: "var(--color-secondary)",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {
                // Lógica para eliminar la cuenta
                const controlador = new UsuarioController();
                const respuesta = await controlador.eliminarUsuario(this.idUsuario);

                if (!respuesta.error) {
                    await Vue.swal({
                title: "¡Cuenta eliminada!",
                text: "Tu cuenta ha sido eliminada exitosamente.",
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
              });
              this.$router.push("/perfil");
                }
            }
          });
        } catch (error) {
          console.error("Error al eliminar la cuenta:", error);
        }
      },
  
      cancelarEliminacion() {
        this.$router.push("/perfil");
      },
    },
  });
  </script>
  
  <style scoped>
  </style>
  