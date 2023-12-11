import { Opinion } from "../../../../modules/opiniones/entities/opinion";

export type ResponseConsultarReporteUsuarioDTO = {
    id_reporte: number;
    fecha: Date;
    titulo: string;
    descripcion: string;
    imagen: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string;
    usuario: string,
    nombre_categoria: string;   
    nombre_municipio: string;
    color: string;
    votos_positivos: number;
    votos_negativos: number;
    voto_usuario?: string;
    opiniones: Opinion[];
}