export type insertReporteDTO = {
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    fk_idPersona: number,
    fk_idMunicipio: number;
    fk_idCategoria: number
}