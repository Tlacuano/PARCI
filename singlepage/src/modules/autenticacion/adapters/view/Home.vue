<template>
  <div>
    <Navbar />

    <b-row :class="configuracion.tema" class="main">
      <b-container fluid>
        <Transition v-if="inHome" name="fade" mode="out-in">
          <b-row>
            <b-col cols="6">
              <b-card @click="dirigir('/a/usuarios')" class="mx-4 mt-5 selectable">
                <b-card-body>
                  <h1 class="text-center">
                    <b-icon icon="person-fill" />
                    Gestion de Usuarios
                </h1>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card @click="dirigir('/a/categorias')" class="mx-4 mt-5 selectable">
                <b-card-body>
                  <h1 class="text-center">
                    <b-icon icon="sticky-fill" />
                    Categorías de reportes
                </h1>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card @click="dirigir('/a/entidades-federativas')" class="mx-4 mt-5 selectable">
                <b-card-body>
                  <h1 class="text-center">
                    <b-icon icon="map-fill" />
                    Entidades federativas
                </h1>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card @click="dirigir('/a/municipios')" class="mx-4 mt-5 selectable">
                <b-card-body>
                  <h1 class="text-center">
                    <b-icon icon="geo-alt-fill" />
                    Municipios
                </h1>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </Transition>
        <Transition v-else name="fade" mode="out-in">
          <router-view />
        </Transition>
      </b-container>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "../../../../components/Navbar.vue";
import { Personalizacion } from "../../../../modules/personalizacion/entities/personalizacion";

export default Vue.extend({
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      inHome: true as boolean,
      configuracion: {
        tema: "",
        tamaño_letra: "",
      } as Personalizacion,
    };
  },
  methods: {
    obtenerPersonalizacion() {
      const personalizacionString = localStorage.getItem("personalizacion");
      const personalizacion = personalizacionString ? JSON.parse(personalizacionString) : null;

      this.configuracion = personalizacion;
    },
    dirigir(ruta: string) {
      if (this.$route.path !== ruta) {
        this.$router.push(ruta);
      }
      this.inHome = false;
    },
  },
  mounted() {
    this.obtenerPersonalizacion();
  },

  watch: {
    $route(to, from) {
      if (to.path === "/a") {
        this.inHome = true;
      }
    },
  },
});
</script>

<style scoped>
.selectable {
  cursor: pointer;
  transition: all 0.2s;
}

.selectable:hover {
  transform: scale(1.02);
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
