<template>
  <b-modal
    id="modal-editar"
    centered
    title="Editar entidad federativa"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Guardar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onEditar"
    :ok-disabled="
      (entidadEdit.nombre_entidad
        ? entidadEdit.nombre_entidad.trim() === ''
        : true) || entidadEdit.nombre_entidad === entidad.nombre_entidad
    "
    @cancel="onCancelar"
  >
    <b-form @submit.prevent="onEditar">
      <b-form-group label="Nombre de la entidad federativa">
        <b-form-input
          v-model="entidadEdit.nombre_entidad"
          placeholder="Nombre"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>
  
  <script lang="ts">
import Vue from "vue";
import { EntidadFederativa } from "../../../entities/entidad-federativa";
import { ModificarEntidadDTO } from "../../dtos/modificar-entidad.dto";
import { EntidadFederativaController } from "../../entidad-federativa.controller";
export default Vue.extend({
  name: "ModalEditar",
  props: {
    entidad: {
      type: Object as () => EntidadFederativa,
      required: true,
    },
  },
  data() {
    return {
      entidadEdit: { ...this.entidad } as ModificarEntidadDTO,
    };
  },
  methods: {
    // Editar entidad federativa
    async onEditar() {
      try {
        Vue.swal({
          title: "¿Estas seguro?",
          text: `¿Deseas editar la entidad federativa ${this.entidad.nombre_entidad}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, editar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.entidadEdit.nombre_entidad =
              this.entidadEdit.nombre_entidad.trim();
            const controlador = new EntidadFederativaController();
            const respuesta = await controlador.modificarEntidadFederativa(
              this.entidadEdit
            );

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Entidad federativa editada!",
                text: `La entidad federativa ${this.entidadEdit.nombre_entidad} ha sido editada correctamente.`,
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

    // Cancelar modal
    onCancelar() {
      this.limpiar();
      this.$bvModal.hide("modal-editar");
    },

    // Limpiar campos
    limpiar() {
      this.entidadEdit = {
        id_entidad: 0,
        nombre_entidad: "",
      };
    },
  },

  watch: {
    entidad: {
      handler() {
        this.entidadEdit = { ...this.entidad };
      },
      deep: true,
    },
  },
});
</script>
  
  <style scoped>
</style>