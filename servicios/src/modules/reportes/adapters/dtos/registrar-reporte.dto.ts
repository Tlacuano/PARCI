export type insertReporteDTO = {
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    votos_positivos: number;
    votos_negativos: number;
    fk_idPersona: number;
    fk_idMunicipio: number;
    fk_idCategoria: number;
    estado: number;
}