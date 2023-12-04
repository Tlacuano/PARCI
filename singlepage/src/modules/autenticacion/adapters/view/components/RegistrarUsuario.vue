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
    :ok-disabled="usuario.usuario.trim() === '' || usuario.contrasena.trim() === ''"
    @cancel="onCancelar"
>

<b-form @submit.prevent="onRegistrar">
    <b-form-group label="Nombre de usuario">
        <b-form-input v-model="usuario.usuario" placeholder="Nombre" required />
    </b-form-group>
    <b-form-group label="Contraseña">
        <b-form-input v-model="usuario.contrasena" placeholder="Contraseña" required />
    </b-form-group>
</b-form>
</b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { RegistrarUsuarioDTO } from "../../../../usuarios/adapters/dtos/registrar-usuario.dto";
import { UsuarioController } from "../../../../usuarios/adapters/usuario.controller";
export default Vue.extend({
name: "RegistrarUsuario",
data() {
    return {
        usuario: {
            usuario: "",
            contrasena: ""
        } as RegistrarUsuarioDTO,
    };
},

methods:{

    // Registrar usuario
    async onRegistrar() {
        try {
            this.usuario.usuario = this.usuario.usuario.trim();
            this.usuario.contrasena = this.usuario.contrasena.trim();
            const controlador = new UsuarioController();
            const respuesta = await controlador.registrarUsuario(
                this.usuario
            );

            if (!respuesta.error) {
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

    // Limpiar formulario
    limpiar() {
        this.usuario.usuario = "";
        this.usuario.contrasena = "";
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