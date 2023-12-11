export type Persona = {
    id_persona?: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    fk_idMunicipio: number;
};