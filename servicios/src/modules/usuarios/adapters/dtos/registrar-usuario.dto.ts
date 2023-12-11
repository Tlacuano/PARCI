import { Persona } from "src/modules/persona/entities/persona";

export type RegistrarUsuarioDTO = {
    usuario: string;
    contrasena: string;
    rol: number;
    fk_idPersona: number;
};
