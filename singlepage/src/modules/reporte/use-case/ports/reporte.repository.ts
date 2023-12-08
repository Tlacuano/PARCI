import { insertReporteDTO } from './../../adapters/dtos/registrar-reporte.dto';
import { ObtenerReporteDTO } from '../../adapters/dtos/obtener-reporte.dto';
import { ObtenerReportesDTO } from '../../adapters/dtos/reponse-get-reporte';
import { RequestConsultarReporteUsuarioDTO } from '../../adapters/dtos/request-consultar-reporte-usuario.dto';
import { ResponseConsultarReporteUsuarioDTO } from '../../adapters/dtos/response-consultar-reporte-usuario.dto';
import { ResponseApi } from './../../../../kernel/types';
import { votarReporteDTO } from '../../adapters/dtos/votar-reporte.dto';
import { ResponseReportesEnEsperaDto } from '../../adapters/dtos/response-consultar-reportes-espera.dto';
import { modifyReporteDTO } from '../../adapters/dtos/modify-reporte.dto';
import { RequestEliminarReporteDTO } from '../../adapters/dtos/request-eliminar-reporte.dto';


export interface ReporteRepository {
    //usuarios
    getReporte(payload: ObtenerReporteDTO):Promise<ResponseApi<ObtenerReportesDTO[]>>;
    consultarReporteUsuario(payload: RequestConsultarReporteUsuarioDTO):Promise<ResponseApi<ResponseConsultarReporteUsuarioDTO>>;
    registrarReporte(payload:insertReporteDTO) : Promise<ResponseApi<string>>;
    votarReporte(payload:votarReporteDTO) : Promise<ResponseApi<boolean>>;
    modificarReporte(payload:modifyReporteDTO) : Promise<ResponseApi<boolean>>;
    eliminarReporte(payload:RequestEliminarReporteDTO) : Promise<ResponseApi<boolean>>;

    consultarReportesEnEspera(payload: null): Promise<ResponseApi<ResponseReportesEnEsperaDto[]>>;

}