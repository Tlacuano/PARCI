<template>
<b-modal id="registrarUser"
    centered
    title="Registrar Usuario"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    ok-title="Registrar"
    ok-variant="success"
    cancel-title="Cancelar"
    cancel-variant="danger"
    @ok="onRegistrar"
    :ok-disabled="usuario.usuario.trim() === '' || usuario.contrasena.trim() === '' || persona.nombre.trim() === '' || persona.apellido_paterno.trim() === '' || persona.apellido_materno.trim() === '' || persona.correo_electronico.trim() === '' || persona.fecha_nacimiento === null || persona.fk_idMunicipio === 0"
    @cancel="onCancelar"
>

<b-form @submit.prevent="onRegistrar">
    <b-form-group label="Nombre de usuario">
        <b-form-input v-model="usuario.usuario" placeholder="Nombre de Usuario" required />
    </b-form-group>
    <b-form-group label="Contraseña">
        <b-form-input v-model="usuario.contrasena" placeholder="Contraseña" required />
    </b-form-group>
    <b-form-group label="Nombre">
        <b-form-input v-model="persona.nombre" placeholder="Nombre" required />
    </b-form-group>
    <b-form-group label="Apellido Paterno">
        <b-form-input v-model="persona.apellido_paterno" placeholder="Apellido Paterno" required />
    </b-form-group>
    <b-form-group label="Apellido Materno">
        <b-form-input v-model="persona.apellido_materno" placeholder="Apellido Materno" required />
    </b-form-group>
    <b-form-group label="Correo Electrónico">
        <b-form-input v-model="persona.correo_electronico" placeholder="Correo Electrónico" required />
    </b-form-group>
    <b-form-group label="Fecha de Nacimiento">
  <b-input-group class="mb-3">
    <b-form-input
      v-model="persona.fecha_nacimiento"
      type="text"
      placeholder="YYYY-MM-DD"
      autocomplete="off"
    ></b-form-input>
    <b-input-group-append>
      <b-form-datepicker
        v-model="persona.fecha_nacimiento"
        button-only
        right
        locale="en-US"
        aria-controls="example-input"
      ></b-form-datepicker>
    </b-input-group-append>
  </b-input-group>
</b-form-group>

    <b-form-group label="Entidad Federativa">
        <b-form-select v-model="entidadFederativaSeleccionada" @change="onEntidadFederativaChange" required>
  <option v-for="entidad in EntidadFederativaActiva" :key="entidad.id_entidad" :value="entidad.id_entidad">
    {{ entidad.nombre_entidad }}
  </option>
</b-form-select>


    </b-form-group>
    <b-form-group label="Municipio">
  <b-form-select
    v-model="persona.fk_idMunicipio"
    :options="municipios"
    required
  ></b-form-select>
</b-form-group>



</b-form>
</b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { RegistrarUsuarioDTO } from "../../../../usuarios/adapters/dtos/registrar-usuario.dto";
import { UsuarioController } from "../../../../usuarios/adapters/usuario.controller";
import { PersonaController } from "../../../../personas/adapters/persona.controller";
import { RegistrarPersonaDTO } from "../../../../personas/adapters/dtos/registrar-persona.dto";
import { MunicipioBoundary } from "../../../../municipios/adapters/municipio-boundary";
import { EntidadFederativaBoundary } from "../../../../entidades/adapters/entidad-federativa.boundary";

interface EntidadFederativaActiva {
  id_entidad: number;
  nombre_entidad: string;
}


export default Vue.extend({
name: "RegistrarUsuario",
data() {
    return {
        usuario: {
            usuario: "",
            contrasena: ""
        } as RegistrarUsuarioDTO,
        persona: {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            correo_electronico: "",
            fecha_nacimiento: null as any,
            fk_idMunicipio: 0,
        } as RegistrarPersonaDTO,
        entidadFederativaSeleccionada: 0,
        EntidadFederativaActiva: [] as EntidadFederativaActiva[], 
        municipios: [],
    };
},


mounted() {
    this.getEntidadesFederativas();
},

methods:{

    // Registrar usuario
    async onRegistrar() {
        try {
            this.usuario.usuario = this.usuario.usuario.trim();
            this.usuario.contrasena = this.usuario.contrasena.trim();
            const controladorUsuario = new UsuarioController();
            this.persona.nombre = this.persona.nombre.trim();
            this.persona.apellido_paterno = this.persona.apellido_paterno.trim();
            this.persona.apellido_materno = this.persona.apellido_materno.trim();
            this.persona.correo_electronico = this.persona.correo_electronico.trim();
            this.persona.fecha_nacimiento = this.persona.fecha_nacimiento;
            this.persona.fk_idMunicipio = this.persona.fk_idMunicipio;
            const controladorPersona = new PersonaController();
            
            const respuesta = await controladorUsuario.registrarUsuario(
                this.usuario
            );

            const respuesta2 = await controladorPersona.registrarPersona(
                this.persona
            );

            if (!respuesta.error && !respuesta2.error) {
                Vue.swal({
                    title: "¡Usuario registrado!",
                    text: `El usuario ${this.usuario.usuario} ha sido registrado correctamente.`,
                    icon: "success",
                    confirmButtonColor: "var(--color-primary)",
                    confirmButtonText: "Aceptar",
                });
                this.limpiar();
                this.$emit("registrado");
                this.$bvModal.hide("registrarUser");
            }
        } catch (error) {
            console.log(error);
        }
    },

    async getEntidadesFederativas() {
  try {
    const response = await EntidadFederativaBoundary.obtenerEntidadesFederativasActivas_local();

    this.EntidadFederativaActiva = response.data;
  } catch (error) {
    console.error("Error al obtener entidades federativas:", error);
  }
},


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




    limpiar() {
        this.usuario.usuario = "";
        this.usuario.contrasena = "";
        this.persona.nombre = "";
        this.persona.apellido_paterno = "";
        this.persona.apellido_materno = "";
        this.persona.correo_electronico = "";
        this.persona.fecha_nacimiento = null as any;
        this.persona.fk_idMunicipio = 0;
    },

    // Cancelar registro
    onCancelar() {
        this.limpiar();
        this.$bvModal.hide("registrarUser");
    },
    
}
});
</script>
<style scoped>
</style>