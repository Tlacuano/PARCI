<template>
  <b-modal
    id="modal-registro"
    centere
    title="Registrar Muncipio"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Registrar"
    cancel-title="Cancelar"
    @ok="onRegistrar"
    :ok-disabled="municipio.nombre_municipio.trim() === ''"
    @cancel="onCancelar"
    header-class="bg-dark"
    body-class="bg-dark"
    footer-class="bg-dark"
  >
    <b-form @submit.prevent="onRegistrar">
      <b-form-group label="Nombre del Municipio">
        <b-form-input
          v-model="municipio.nombre_municipio"
          placeholder="Nombre"
          required
        />
      </b-form-group>
      <b-form-group label="Entidad Federativa">
        <b-form-select
          v-model="municipio.fk_idEntidad"
          :options="entidadesFederativas"
          value-field="id_entidad"
          text-field="nombre_entidad"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { MunicipioController } from "../../municipio.controller";
import { RegistrarMunicipioDTO } from "../../dtos/registrar-municipio.dto";
import { EntidadFederativaController } from "@/modules/entidades/adapters/entidad-federativa.controller";

export default Vue.extend({
  name: "ModalRegistro",
  data() {
    return {
      municipio: {
        nombre_municipio: "",
        fk_idEntidad: 0,
      } as RegistrarMunicipioDTO,
      entidadesFederativas: [],
    };
  },

  async created() {
    await this.cargarEntidadesFederativas();
  },

  methods: {
    async cargarEntidadesFederativas() {
      try {
        const controladorEntidades = new EntidadFederativaController();
        const respuesta =
          await controladorEntidades.obtenerEntidadesFederativas();

        if (!respuesta.error) {
          this.entidadesFederativas = respuesta.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onRegistrar() {
      try {
        this.municipio.nombre_municipio =
          this.municipio.nombre_municipio.trim();
        this.municipio.fk_idEntidad = this.municipio.fk_idEntidad;
        const controlador = new MunicipioController();

        const respuesta = await controlador.registrarMunicipio(this.municipio);

        if (!respuesta.error) {
          Vue.swal({
            title: "¡Municipio registrado correctamente!",
            text: `El municipio ${this.municipio.nombre_municipio} ha sido registrado correctamente.`,
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
      this.municipio = {
        nombre_municipio: "",
        fk_idEntidad: 0,
      };
    },
  },
});
</script>
