export type ObtenerReportesDTO = {
    id_reporte: number,
    titulo: string,
    imagen: string,
    fecha: Date,
    nombre: string,
    usuario: string,
    apellido_paterno: string,
    apellido_materno?: string,
    nombre_categoria: string,
    color: string,
    votos_positivos: number,
    votos_negativos: number,
    voto_usuario?: string
}