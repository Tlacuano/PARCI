
export type RegistrarUsuarioDTO = {
    usuario: string;
    contrasena: string;
    rol: number;
    codigo: string;
    fecha_opinion: Date;
    contador_opinion: number;
    fk_idPersona: number;
};
