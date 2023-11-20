export type Reporte = {
    id_reporte: number;
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    votos_positivos: number;
    votos_negativos: number;
    fk_idPersona: number;
    fk_idMunicipio: number;
    fk_idCategoria: number;
    estado: string;
};

