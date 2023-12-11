import { Persona } from "../../personas/entities/persona";

export type Usuario = {
    id_usuario: number;
    usuario: string;
    contraseña: string;
    rol: number;
    codigo: string;
    fecha_opinion: Date;
    contador_opinion: number;
    fk_idPersona: Persona;
};
