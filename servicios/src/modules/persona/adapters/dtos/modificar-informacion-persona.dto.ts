import { Usuario } from "src/modules/usuarios/entities/usuario";

export type ModificarInformacionPersonaDTO = {
    id_persona: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo_electronico: string;
};