import { Reporte } from "../../entities/reporte";
import { insertReporteDTO} from "../../adapters/dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "../../adapters/dtos/modify-reporte.dto";
import { votarReporteDTO } from "../../adapters/dtos/votar-reporte.dto";
import { modificarEstadoReporteDTO } from '../../adapters/dtos/modificar-estado-reporte.dto'

export interface ReporteRepository {
    obtenerReporte():Promise<Reporte[]>;
    obtenerReportesEnEspera():Promise<Reporte[]>;
    obtenerReportePorFecha(fecha:Date):Promise<Reporte[]>;
    obtenerReportePorCategoria(fk_idCategoria:number):Promise<Reporte[]>;
    modificarReporte(payload: modifyReporteDTO):Promise<boolean>;
    insertReporte(payload: insertReporteDTO): Promise<boolean>;
    deleteReporte (id_report: number): Promise<boolean>;
    votarReporte(payload: votarReporteDTO):Promise<boolean>;
    modificarEstadoReporte(payload: modificarEstadoReporteDTO):Promise<boolean>;
}


