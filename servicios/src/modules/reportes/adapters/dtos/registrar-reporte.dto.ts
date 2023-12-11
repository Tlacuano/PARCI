export type insertReporteDTO = {
    fecha: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    imagenes: string[];
    usuario: string,
    fk_idMunicipio: number;
    fk_idCategoria: number
}