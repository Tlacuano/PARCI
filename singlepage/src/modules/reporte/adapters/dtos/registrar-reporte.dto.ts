export type insertReporteDTO = {
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    usuario: string,
    fk_idMunicipio: number;
    fk_idCategoria: number
}