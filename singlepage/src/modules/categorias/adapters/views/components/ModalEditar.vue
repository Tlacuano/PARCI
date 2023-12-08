<template>
  <b-modal
    id="modal-editar"
    centered
    title="Editar categoria"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Guardar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onEditar"
    :ok-disabled="
      (categoriaEdit.nombre_categoria
        ? categoriaEdit.nombre_categoria.trim() === ''
        : true) || (categoriaEdit.nombre_categoria == categoria.nombre_categoria ) ||
         (categoriaEdit.color ? categoriaEdit.color.trim() === '' : true) ||
      categoriaEdit.color == categoria.color
    "
    @cancel="onCancelar"
  >
    <b-form @submit.prevent="onEditar">
      <b-form-group label="Nombre de la categoria">
        <b-form-input
          v-model="categoriaEdit.nombre_categoria"
          placeholder="Nombre"
          required
        />
      </b-form-group>
      <b-form-group label="Color de la categoria">
        <b-form-input
          v-model="categoriaEdit.color"
          placeholder="Color"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { categoria } from "@/modules/categorias/entities/categoria";
import { modifyCategoriaDTO } from "../../dtos/modify-categoria.dto";
import { CategoriaController } from "../../categoria.controller";

export default Vue.extend({
  name: "ModalEditar",
  props: {
    categoria: {
      type: Object as () => categoria,
      required: true,
    },
  },

  data() {
    return {
      categoriaEdit: { ...this.categoria } as modifyCategoriaDTO,
    };
  },

  methods: {
    async onEditar() {
      try {
        Vue.swal({
          title: "¿Estas seguro?",
          text: `¿Deseas editar la categoria ${this.categoria.nombre_categoria}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--color-primary)",
          cancelButtonColor: "var(--color-secondary)",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, editar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.categoriaEdit.nombre_categoria =
              this.categoriaEdit.nombre_categoria.trim();
            this.categoriaEdit.color = this.categoriaEdit.color.trim();
            const controlador = new CategoriaController();
            const respuesta = await controlador.modificarCategoria(
              this.categoriaEdit
            );

            if (!respuesta.error) {
              Vue.swal({
                title: "¡Categoria editada!",
                text: `La categoria ${this.categoria.nombre_categoria} ha sido editada correctamente.`,
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
      this.categoriaEdit = {
        id_categoria: 0,
        nombre_categoria: "",
        color: "",
      };
    },
  },

  watch: {
    categoria: {
      handler() {
        this.categoriaEdit = { ...this.categoria };
      },
      deep: true,
    },
  },
});
</script>

<style scoped></style>
