import { Reporte } from "../../entities/reporte";
import { insertReporteDTO} from "../../adapters/dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "../../adapters/dtos/modify-reporte.dto";
import { votarReporteDTO } from "../../adapters/dtos/votar-reporte.dto";
import { modificarEstadoReporteDTO } from '../../adapters/dtos/modificar-estado-reporte.dto'
import { ObtenerReporteDTO } from "../../adapters/dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "../../adapters/dtos/reponse-get-reporte";
import { RequestConsultarReporteUsuarioDTO } from "../../adapters/dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteUsuarioDTO } from "../../adapters/dtos/response-consultar-reporte-usuario.dto";
import { ResponseConsultarVotoPorUsuarioDTO } from "../../adapters/dtos/response-consultar-voto-por-usuario.dto";
import { ResponseReportesEnEsperaDto } from "../../adapters/dtos/response-consultar-reportes-espera.dto";
import { ResponseConsultarReporteEsperaDto } from "../../adapters/dtos/response-consultar-reporte-espera.dto";

export interface ReporteRepository {
    getReporte(payload: ObtenerReporteDTO):Promise<ObtenerReportesDTO[]>;
    obtenerReportesEnEspera():Promise<ResponseReportesEnEsperaDto[]>;
    modificarReporte(payload: modifyReporteDTO):Promise<boolean>;
    insertReporte(payload: insertReporteDTO): Promise<boolean>;
    deleteReporte (id_report: number): Promise<boolean>;
    
    modificarEstadoReporte(payload: modificarEstadoReporteDTO):Promise<boolean>;

    consultarReporteUsuario(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteUsuarioDTO>;
    consultarReporteEnEspera(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteEsperaDto>;

    votarReporte(payload: votarReporteDTO):Promise<boolean>;
    consultarVotoPorUsuario(payload:votarReporteDTO) : Promise<ResponseConsultarVotoPorUsuarioDTO>;
    modificarVotoPorUsuario(payload: votarReporteDTO): Promise<boolean>;
    eliminarVotoReporte(payload: votarReporteDTO): Promise<boolean>;
}


