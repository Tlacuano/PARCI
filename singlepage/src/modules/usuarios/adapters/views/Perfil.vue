<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Perfil Usuario</h4>
      </b-col>
      <b-col cols="12" lg="9">
        <h5 class="mb-4">Hola {{ usuario }}!</h5>
        <b-tabs v-model="selectedTab" content-class="mt-3" class="text-center">
          <b-tab title="Editar información Usuario" active>
            <ModificarUsuario />
          </b-tab>
          <b-tab title="Editar información Persona">
            <h5 class="mb-4">Editar información de persona</h5>
            <div>
              <p>Nuevo nombre: <b-form-input v-model="nuevoNombre" /></p>
              <p>Nuevo apellido paterno: <b-form-input v-model="nuevoApellidoPaterno" /></p>
              <p>Nuevo apellido materno: <b-form-input v-model="nuevoApellidoMaterno" /></p>
              <p>Nuevo correo electronico: <b-form-input v-model="nuevoCorreo" /></p>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <b-button variant="primary" @click="confirmarEdicion">Confirmar</b-button>
              <b-button variant="secondary" @click="cancelarEdicion">Cancelar</b-button>
            </div>
            <!-- Fin del contenido de la edición de información de persona -->
          </b-tab>
          <b-tab title="Eliminar cuenta" class="eliminar-cuenta-tab">
            <div class="eliminar-cuenta-container">
              <div class="eliminar-cuenta-content mx-auto">
                <h5 class="eliminar-cuenta-title">Eliminar cuenta de usuario</h5>
                <p class="mb-4">¿Estás seguro de que deseas eliminar tu cuenta?</p>
                <p class="mb-4">Esta acción es irreversible, los datos asociados con la cuenta serán eliminados</p>

                <div class="d-flex justify-content-center">
                  <b-button variant="danger" @click="confirmarEliminacion">
                    Eliminar cuenta
                  </b-button>
                </div>
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
import { cambioPersonalizacion } from "@/kernel/cambioPersonalizacion";
import { PersonaController } from "../../../personas/adapters/persona.controller"


export default Vue.extend({
  name: "PerfilUsuario",


  data() {
    return {
      usuario: "",
      nuevoNombre: "",
      nuevoApellidoPaterno: "",
      nuevoApellidoMaterno: "",
      nuevoCorreo: "",
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
              this.cerrarSesion();

              this.$router.push("/login");
            }
          }
        });
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    },

    cancelarEdicion() {
      this.$router.push("/perfil");
    },

    async confirmarEdicion() {
      try {
        await Vue.swal({
          title: "Editar información",
          text: "¿Estás seguro de que deseas editar tu información?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sí, editar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const nombreUsuario = this.obtenerUsuario();
            const controladorPersona = new PersonaController();

            const editarPersonaDto = {
              usuario: nombreUsuario,
              nombre: this.nuevoNombre,
              apellido_paterno: this.nuevoApellidoPaterno,
              apellido_materno: this.nuevoApellidoMaterno,
              correo: this.nuevoCorreo,
            };

            const respuesta = await controladorPersona.modificarPersona(editarPersonaDto);
            if (!respuesta.error) {
              await Vue.swal({
                title: "¡Información editada!",
                text: "Tu información ha sido editada exitosamente.",
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
              });
              this.$router.push("/perfil");
            }
          }
        });
      } catch (error) {
        console.error("Error al editar la información:", error);
      }
    },

    obtenerUsuario() {
      const usuarioString = localStorage.getItem("usuario") || "";
      const usuario = JSON.parse(usuarioString);
      return usuario ? usuario.usuario : "";
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("personalizacion");
      cambioPersonalizacion({
        tema: "Claro",
        tamaño_letra: "Mediana",
      });
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
.eliminar-cuenta-tab {
  text-align: center;
}

.eliminar-cuenta-container {
  /* Color de fondo */
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.eliminar-cuenta-content {
  max-width: 400px;
  margin: 0 auto;
}

.eliminar-cuenta-title {
  font-size: 30px;
  margin-top: 10px;
}

.eliminar-cuenta-tab .nav-link.active {
  color:mediumspringgreen !important;
}

</style>

