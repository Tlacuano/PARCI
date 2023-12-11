import { UseCase } from "../../../kernel/contracts";
import { RequestConsultarReporteUsuarioDTO } from "../adapters/dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteUsuarioDTO } from "../adapters/dtos/response-consultar-reporte-usuario.dto";
import { ResponseApi } from "../../../kernel/types";
import { ReporteRepository } from "./ports/reporte.repository";



export class ConsultarReporteUsuarioInteractor implements UseCase<RequestConsultarReporteUsuarioDTO,ResponseApi<ResponseConsultarReporteUsuarioDTO>>{
    constructor(private reporteRepository: ReporteRepository){}

    execute(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseApi<ResponseConsultarReporteUsuarioDTO>> {
        return this.reporteRepository.consultarReporteUsuario(payload);
    }

}