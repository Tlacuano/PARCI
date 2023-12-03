import { ResponseApi } from "../../../kernel/types";
import { ReporteRepository } from "../use-case/ports/reporte.repository";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";
import api from '../../../config/http-client.gateway';



export class ReporteStorageGateway implements ReporteRepository{
    async getReporte(payload: ObtenerReporteDTO): Promise<ResponseApi<ObtenerReportesDTO[]>> {
        const respuesta = await api.doPost('/reportes/consultar', payload);
        return{
            ...respuesta.data
        } as ResponseApi<ObtenerReportesDTO[]>
    }
}