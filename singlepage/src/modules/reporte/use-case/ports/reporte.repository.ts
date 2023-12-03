import { ObtenerReporteDTO } from '../../adapters/dtos/obtener-reporte.dto';
import { ObtenerReportesDTO } from '../../adapters/dtos/reponse-get-reporte';
import { ResponseApi } from './../../../../kernel/types';


export interface ReporteRepository {
    //usuarios
    getReporte(payload: ObtenerReporteDTO):Promise<ResponseApi<ObtenerReportesDTO[]>>;


}