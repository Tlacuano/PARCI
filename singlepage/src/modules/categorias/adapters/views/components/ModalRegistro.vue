<template>
  <b-modal
    id="modal-registro"
    centered
    title="Registrar categoria"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Registrar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onRegistrar"
    :ok-disabled="categoria.nombre_categoria.trim() === '' || categoria.color.trim() === ''"
    @cancel="onCancelar"
  >
    <b-form @submit.prevent="onRegistrar">
      <b-form-group label="Nombre de la categoria">
        <b-form-input
          v-model="categoria.nombre_categoria"
          placeholder="Nombre"
          required
        />
      </b-form-group>
      <b-form-group label="Color de la categoria">
        <b-form-input
          v-model="categoria.color"
          placeholder="Color"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { insertCategoriaDto } from "../../dtos/insert-categoria.dto";
import { CategoriaController } from "../../categoria.controller";

export default Vue.extend({
  name: "ModalRegistro",

  data() {
    return {
      categoria: {
        nombre_categoria: "",
        color: "",
      } as insertCategoriaDto,
    };
  },

  methods: {
    //modals
    async onRegistrar() {
      try {
        this.categoria.nombre_categoria =
          this.categoria.nombre_categoria.trim();
          this.categoria.color = this.categoria.color.trim();
        const controlador = new CategoriaController();
        const respuesta = await controlador.registrarCategoria(this.categoria);
        if (!respuesta.error) {
          Vue.swal({
            title: "¡Categoria registrada!",
            text: `La categoria ${this.categoria.nombre_categoria} ha sido registrada correctamente.`,
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

    onCancelar() {
      this.limpiar();
      this.$bvModal.hide("modal-registro");
    },

    limpiar() {
      this.categoria = {
        nombre_categoria: "",
        color: "",
      };
    },
  },
});
</script>

<style scoped></style>
