import { Reporte } from "../../entities/reporte";
import { insertReporteDTO} from "../../adapters/dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "../../adapters/dtos/modify-reporte.dto";
import { votarReporteDTO } from "../../adapters/dtos/votar-reporte.dto";
import { modificarEstadoReporteDTO } from '../../adapters/dtos/modificar-estado-reporte.dto'
import { ObtenerReporteDTO } from "../../adapters/dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "../../adapters/dtos/reponse-get-reporte";

export interface ReporteRepository {
    getReporte(payload: ObtenerReporteDTO):Promise<ObtenerReportesDTO[]>;
    obtenerReportesEnEspera():Promise<Reporte[]>;
    modificarReporte(payload: modifyReporteDTO):Promise<boolean>;
    insertReporte(payload: insertReporteDTO): Promise<boolean>;
    deleteReporte (id_report: number): Promise<boolean>;
    votarReporte(payload: votarReporteDTO):Promise<boolean>;
    modificarEstadoReporte(payload: modificarEstadoReporteDTO):Promise<boolean>;
}


