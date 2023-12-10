<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Perfil Usuario</h4>
      </b-col>
      <b-col cols="12" lg="9">
        <h5 class="mb-4">Hola {{ usuario }}</h5>
        <b-tabs v-model="selectedTab" content-class="mt-3">
          <b-tab title="Editar información cuenta" active>
            <ModificarUsuario />
          </b-tab>
          <b-tab title="Editar información Usuario">
            <ModificarPersona />
          </b-tab>
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
            <EliminarUsuario />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import ModificarUsuario from "./components/ModificarUsuario.vue";
import ModificarPersona from "./components/ModificarPersona.vue";
import { UsuarioController } from "../../adapters/usuario.controller";
import { EliminarUsuarioDTO } from "../../adapters/dtos/eliminar-usuario.dto";

export default Vue.extend({
  name: "PerfilUsuario",


  data() {
    return {
      usuario: "",
      selectedTab: "ModificarUsuario",
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
                const nombreUsuario = this.obtenerUsuario();
        const controlador = new UsuarioController();

        const eliminarUsuarioDTO: EliminarUsuarioDTO = {
  usuario: nombreUsuario,
};

console.log(eliminarUsuarioDTO);
            const respuesta = await controlador.eliminarUsuario(eliminarUsuarioDTO);
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

      obtenerUsuario() {
    const usuarioString = localStorage.getItem("usuario") || "";
    const usuario = JSON.parse(usuarioString);
    return usuario ? usuario.usuario : "";
},


    obtenerUsuarioFront() {
      const nombreUsuarioFront = localStorage.getItem("usuario") || "";
      const usuarioName = JSON.parse(nombreUsuarioFront);
      this.usuario = usuarioName ? usuarioName.usuario : "";
      return this.usuario;
    },
 
  

    selectTab(tabName: string) {
      this.selectedTab = tabName;
    },
  },
  

  mounted() {
    this.obtenerUsuarioFront();

  },
});
</script>

<style scoped>
.user-options {
  margin-top: 2rem;
  cursor: pointer;
}

.option-icon {
  margin-right: 0.5rem;
}
</style>
