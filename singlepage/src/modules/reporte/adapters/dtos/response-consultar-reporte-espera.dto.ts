export type ResponseConsultarReporteEsperaDto = {
    id_reporte: number;
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    nombre_completo_persona: string;
    correo_electronico: string;
    nombre_categoria: string;
    color: string;
    nombre_municipio: string;
};