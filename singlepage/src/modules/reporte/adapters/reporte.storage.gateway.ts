import { ResponseApi } from "../../../kernel/types";
import { ReporteRepository } from "../use-case/ports/reporte.repository";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";
import api from '../../../config/http-client.gateway';
import { RequestConsultarReporteUsuarioDTO } from "./dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteUsuarioDTO } from "./dtos/response-consultar-reporte-usuario.dto";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { ResponseReportesEnEsperaDto } from "./dtos/response-consultar-reportes-espera.dto";



export class ReporteStorageGateway implements ReporteRepository{


    async getReporte(payload: ObtenerReporteDTO): Promise<ResponseApi<ObtenerReportesDTO[]>> {
        const respuesta = await api.doPost('/reportes/consultar', payload);
        return{
            ...respuesta.data
        } as ResponseApi<ObtenerReportesDTO[]>
    }

    async consultarReporteUsuario(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseApi<ResponseConsultarReporteUsuarioDTO>> {
        const respuesta = await api.doPost('/reportes/consultar-usuario', payload);
        return{
            ...respuesta.data
        } as ResponseApi<ResponseConsultarReporteUsuarioDTO>
    }

    async registrarReporte(payload: insertReporteDTO): Promise<ResponseApi<string>> {
        const respuesta = await api.doPost('/reportes/registrar', payload);
        return{
            ...respuesta.data
        } as ResponseApi<string>
    }

    async votarReporte(payload: votarReporteDTO): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost('/reportes/votar', payload);
        return{
            ...respuesta.data
        } as ResponseApi<boolean>
    }

    async consultarReportesEnEspera(payload: null): Promise<ResponseApi<ResponseReportesEnEsperaDto[]>> {
        const respuesta = await api.doGet('/reportes/consultar-en-espera');
        return{
            ...respuesta.data
        } as ResponseApi<ResponseReportesEnEsperaDto[]>
    }
}