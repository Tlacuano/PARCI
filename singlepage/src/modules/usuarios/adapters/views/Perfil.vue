<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="12">
        <h4 class="mb-4">Perfil Usuario</h4>
      </b-col>
      <b-col cols="12" lg="3">
        <div class="left-panel">
          <h5 class="mb-4">Hola {{ nombreUsuario }}</h5>
          <div class="user-options">
            <div @click="selectTab('editarCuenta')">
              <b-icon icon="person-fill" class="option-icon" />
              Editar información cuenta
            </div>
            <div @click="selectTab('editarPersona')">
              <b-icon icon="pencil-square" class="option-icon" />
              Editar información Usuario
            </div>
            <div @click="selectTab('eliminarCuenta')">
              <b-icon icon="trash-fill" class="option-icon" />
              Eliminar cuenta
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" lg="9">
        <b-tabs v-model="selectedTab" content-class="mt-3">
          <b-tab title="Editar información cuenta" active>
            <ModificarUsuario />
          </b-tab>
          <b-tab title="Editar información Usuario">
            <ModificarPersona />
          </b-tab>
          <b-tab title="Eliminar cuenta">
            <EliminarUsuario />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import EliminarUsuario from "./components/EliminarUsuario.vue";
import ModificarUsuario from "./components/ModificarUsuario.vue";
import ModificarPersona from "./components/ModificarPersona.vue";

export default Vue.extend({
  name: "PerfilUsuario",

  data() {
    return {
      nombreUsuario: '',
      selectedTab: "editarCuenta",
    };
  },

  methods: {
    obtenerNombreUsuario() {
      this.nombreUsuario = localStorage.getItem("nombreUsuario")!;
    },

    selectTab(tabName: string) {
      this.selectedTab = tabName;
    },
  },
});
</script>

<style scoped>
.left-panel {
  background-color: #cecece;
  padding: 1rem;
  height: 100%;
}

.user-options {
  margin-top: 2rem;
  cursor: pointer;
}

.option-icon {
  margin-right: 0.5rem;
}
</style>
