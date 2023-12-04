export type RegistrarPersonaDTO = {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    fk_idMunicipio: number;
};