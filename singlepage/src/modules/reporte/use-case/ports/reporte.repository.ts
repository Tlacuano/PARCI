import { ObtenerReporteDTO } from '../../adapters/dtos/obtener-reporte.dto';
import { ObtenerReportesDTO } from '../../adapters/dtos/reponse-get-reporte';
import { RequestConsultarReporteUsuarioDTO } from '../../adapters/dtos/request-consultar-reporte-usuario.dto';
import { ResponseConsultarReporteUsuarioDTO } from '../../adapters/dtos/response-consultar-reporte-usuario.dto';
import { ResponseApi } from './../../../../kernel/types';


export interface ReporteRepository {
    //usuarios
    getReporte(payload: ObtenerReporteDTO):Promise<ResponseApi<ObtenerReportesDTO[]>>;
    consultarReporteUsuario(payload: RequestConsultarReporteUsuarioDTO):Promise<ResponseApi<ResponseConsultarReporteUsuarioDTO>>;


}