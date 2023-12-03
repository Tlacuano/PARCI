<template>
  <b-modal
    id="modal-editar"
    centered
    title="Editar entidad federativa"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Guardar"
    cancel-title="Cancelar"
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
        this.entidadEdit.nombre_entidad =
          this.entidadEdit.nombre_entidad.trim();
        const controlador = new EntidadFederativaController();
        const respuesta = await controlador.modificarEntidadFederativa(
          this.entidadEdit
        );

        if (!respuesta.error) {
          this.$bvToast.toast("Entidad federativa editada", {
            title: "Éxito",
            variant: "success",
            solid: true,
          });
          this.limpiar();
          this.$emit("editado");
          this.$bvModal.hide("modal-editar");
        }
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

  mounted() {
    console.log(this.entidad);
    console.log(this.entidadEdit);
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