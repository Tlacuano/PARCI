<template>
  <b-modal
    id="modal-registro"
    centered
    title="Registrar entidad federativa"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Registrar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onRegistrar"
    :ok-disabled="entidad.nombre_entidad.trim() === ''"
    @cancel="onCancelar"
  >
    <b-form @submit.prevent="onRegistrar">
      <b-form-group label="Nombre de la entidad federativa">
        <b-form-input
          v-model="entidad.nombre_entidad"
          placeholder="Nombre"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { RegistrarEntidadDTO } from "../../dtos/registrar-entidad.dto";
import { EntidadFederativaController } from "../../entidad-federativa.controller";
export default Vue.extend({
  name: "ModalRegistro",
  data() {
    return {
      entidad: {
        nombre_entidad: "",
      } as RegistrarEntidadDTO,
    };
  },
  methods: {
    // Registrar entidad federativa
    async onRegistrar() {
      try {
        this.entidad.nombre_entidad = this.entidad.nombre_entidad.trim();
        const controlador = new EntidadFederativaController();
        const respuesta = await controlador.registrarEntidadFederativa(
          this.entidad
        );

        if (!respuesta.error) {
          Vue.swal({
            title: "¡Entidad federativa registrada!",
            text: `La entidad federativa ${this.entidad.nombre_entidad} ha sido registrada correctamente.`,
            icon: "success",
            confirmButtonColor: "var(--color-primary)",
            confirmButtonText: "Aceptar",
          });
          this.limpiar();
          this.$emit("registrado");
          this.$bvModal.hide("modal-registro");
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Cancelar modal
    onCancelar() {
      this.limpiar();
      this.$bvModal.hide("modal-registro");
    },

    // Limpiar campos
    limpiar() {
      this.entidad = {
        nombre_entidad: "",
      };
    },
  },
});
</script>

<style scoped>
</style>