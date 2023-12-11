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
            <h5 class="mb-4">Editar información de usuario</h5>
            <div class="d-flex flex-column align-items-center"> <!-- Añadida la clase align-items-center -->
              <div class="d-flex align-items-center mb-2">
                <label for="nombreUsuario" class="mr-2"><b>Nombre de Usuario:</b></label>
                <b-form-input id="nombreUsuario" v-model="nombreUsuario" size="sm" class="small-input" />
              </div>
              <div class="d-flex align-items-center mb-2">
                <label for="contrasena" class="mr-2"><b>Contraseña:</b></label>
                <b-form-input id="contrasena" type="password" v-model="contrasena" size="sm" class="small-input" />
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <b-button variant="primary">Confirmar</b-button>
              <b-button variant="secondary" class="ml-2">Cancelar</b-button>
            </div>
          </b-tab>


          <b-tab title="Editar información Persona">
            <h5 class="mb-4 text-center">Editar información de persona</h5>
            <div class="d-flex flex-column align-items-center">
              <div class="d-flex align-items-center mb-2">
                <p class="mr-2"><b>Nombre:</b></p>
                <b-form-input v-model="nuevoNombre" size="sm" class="small-input" />
              </div>
              <div class="d-flex align-items-center mb-2">
                <p class="mr-2"><b>Apellido paterno:</b></p>
                <b-form-input v-model="nuevoApellidoPaterno" size="sm" class="small-input" />
              </div>
              <div class="d-flex align-items-center mb-2">
                <p class="mr-2"><b>Apellido materno:</b></p>
                <b-form-input v-model="nuevoApellidoMaterno" size="sm" class="small-input" />
              </div>
              <div class="d-flex align-items-center mb-2">
                <p class="mr-2"><b>Correo electrónico:</b></p>
                <b-form-input v-model="nuevoCorreo" size="sm" class="small-input" />
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3 mb-4">
              <b-button variant="primary" @click="confirmarEdicion">Confirmar</b-button>
              <b-button variant="secondary" @click="cancelarEdicion" class="ml-2">Cancelar</b-button>
            </div>
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
              correo_electronico: this.nuevoCorreo,
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
  color: mediumspringgreen !important;
}


.small-input {
  width: 150px;
}
</style>

