<template>
    <b-modal
      id="modal-registro"
      centered
      title="Agregar Usuario"
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
      ok-title="Guardar"
      ok-variant="success"
      cancel-title="Cancelar"
      cancel-variant="danger"
      @ok="agregarUsuario"
      @cancel="cancelarAgregarUsuario"
    >
      <b-form @submit.prevent="agregarUsuario">
        <!-- Campos del formulario -->
        <b-form-group label="Usuario" label-for="usuario">
          <b-form-input v-model="nuevoUsuario.usuario" id="usuario" required />
        </b-form-group>
  
        <b-form-group label="Contraseña" label-for="contrasena">
          <b-form-input v-model="nuevoUsuario.contrasena" type="password" id="contrasena" required />
        </b-form-group>
  
        <b-form-group label="Rol" label-for="rol">
          <b-form-select v-model="nuevoUsuario.rol" :options="roles" id="rol" required />
        </b-form-group>
  
        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input v-model="nuevoUsuario.nombre" id="nombre" required />
        </b-form-group>
  
        <b-form-group label="Apellido Paterno" label-for="apellidoPaterno">
          <b-form-input v-model="nuevoUsuario.apellidoPaterno" id="apellidoPaterno" required />
        </b-form-group>
  
        <b-form-group label="Apellido Materno" label-for="apellidoMaterno">
          <b-form-input v-model="nuevoUsuario.apellidoMaterno" id="apellidoMaterno" />
        </b-form-group>
  
        <b-form-group label="Correo Electrónico" label-for="correoElectronico">
          <b-form-input v-model="nuevoUsuario.correoElectronico" type="email" id="correoElectronico" required />
        </b-form-group>
  
        <b-form-group label="Fecha Nacimiento" label-for="fechaNacimiento">
          <b-form-input v-model="nuevoUsuario.fechaNacimiento" type="date" id="fechaNacimiento" required />
        </b-form-group>

        <b-form-group label="Entidad Federativa">
    <b-form-select v-model="entidadFederativaSeleccionada" @change="onEntidadFederativaChange" required>
      <option v-for="entidad in EntidadFederativaActiva" :key="entidad.id_entidad" :value="entidad.id_entidad">
        {{ entidad.nombre_entidad }}
      </option>
    </b-form-select>
  </b-form-group>

  <b-form-group label="Municipio">
    <b-form-select v-model="nuevoUsuario.usuario" required>
      <option v-for="municipio in municipios" :key="municipio.id_municipio" :value="municipio.id_municipio">
        {{ municipio.nombre_municipio }}
      </option>
    </b-form-select>
  </b-form-group>
  
  
      </b-form>
    </b-modal>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { MunicipioBoundary } from "../../../../municipios/adapters/municipio-boundary";
import { EntidadFederativaBoundary } from "../../../../entidades/adapters/entidad-federativa.boundary";
  

interface EntidadFederativaActiva {
  id_entidad: number;
  nombre_entidad: string;
}

  export default Vue.extend({
    name: "ModalAgregarUsuario",
    data() {
      return {
        nuevoUsuario: {
          usuario: "",
          contrasena: "",
          rol: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          correoElectronico: "",
          fechaNacimiento: "",
            entidadFederativa: "",
            municipio: "",
        },
        roles: ["Administrador", "Moderador", "Usuario"],
        entidadFederativaSeleccionada: 0,
      EntidadFederativaActiva: [] as EntidadFederativaActiva[],
      municipios: [] as any[],
      };
    },
    methods: {

      async onEntidadFederativaChange(selectedEntidadId: number) {
      try {
        console.log('ID de la entidad federativa seleccionada:', selectedEntidadId);

        const municipiosResponse = await MunicipioBoundary.getMunicipiosPorEntidad_local(selectedEntidadId);
        this.municipios = municipiosResponse.data;

        console.log('Respuesta de la API (municipios):', municipiosResponse);
      } catch (error) {
        console.error(error);
      }
    },




      agregarUsuario() {
       
        console.log("Nuevo usuario:", this.nuevoUsuario);
       
        this.limpiarFormulario();
      },
      cancelarAgregarUsuario() {
        this.limpiarFormulario();
      },
      limpiarFormulario() {
        this.nuevoUsuario = {
          usuario: "",
          contrasena: "",
          rol: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          correoElectronico: "",
          fechaNacimiento: "",
            entidadFederativa: "",
            municipio: "",
        };
      },
    },
  });
  </script>
  
  <style scoped>
  </style>
  