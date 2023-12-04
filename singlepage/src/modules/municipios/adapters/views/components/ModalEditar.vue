<template>
  <b-modal
    id="modal-editar"
    centered
    title="Editar Municipio"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Guardar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onEditar"
    :ok-diabled="
      (municipioEdit.nombre_municipio
        ? municipioEdit.nombre_municipio.trim() === ''
        : true) || municipioEdit.nombre_municipio === municipio.nombre_municipio
    "
    @cancel="onCancelar"
  >
    <b-form @submit.prevent="onEditar">
      <b-form-group label="Nombre del Municipio">
        <b-form-input
          v-model="municipioEdit.nombre_municipio"
          placeholder="Nombre"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Municipio } from "../../../entities/municipio";
import { ModificarMunicipioDTO } from "../../dtos/modificar-municipio.dto";
import { MunicipioController } from "../../municipio.controller";

export default Vue.extend({
  name: "ModalEditar",
  props: {
    municipio: {
      type: Object as () => Municipio,
      required: true,
    },
  },
  data() {
    return {
      municipioEdit: { ...this.municipio } as ModificarMunicipioDTO,
    };
  },
  methods: {
    async onEditar() {
      try {
        Vue.swal({
          title: "¿Estas seguro?",
          text: `¿Deseas editar el municipio ${this.municipio.nombre_municipio}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, editar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.municipioEdit.nombre_municipio =
              this.municipioEdit.nombre_municipio.trim();
            const controlador = new MunicipioController();
            const respuesta = await controlador.modificarMunicipio(
              this.municipioEdit
            );

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Municipio editado correctamente!",
                text: `El municipio ${this.municipioEdit.nombre_municipio} ha sido editado correctamente.`,
                icon: "success",
                confirmButtonColor: "var(--color-primary)",
                confirmButtonText: "Aceptar",
              });
              this.limpiar();
              this.$emit("editado");
              this.$bvModal.hide("modal-editar");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    onCancelar() {
      this.limpiar();
      this.$bvModal.hide("modal-editar");
    },

    limpiar() {
      this.municipioEdit = {
        id_municipio: 0,
        nombre_municipio: "",
        fk_idEntidad: 0,
      };
    },
  },

  watch: {
    municipio: {
      handler() {
        this.municipioEdit = { ...this.municipio };
      },
      deep: true,
    },
  },
});
</script>
