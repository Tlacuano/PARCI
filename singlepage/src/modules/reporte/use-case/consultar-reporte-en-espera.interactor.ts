import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { RequestConsultarReporteUsuarioDTO } from "../adapters/dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteEsperaDto } from "../adapters/dtos/response-consultar-reporte-espera.dto";
import { ReporteRepository } from "./ports/reporte.repository";




export class ConsultarReporteEnEsperaInteractor implements UseCase<RequestConsultarReporteUsuarioDTO,ResponseApi<ResponseConsultarReporteEsperaDto> >{
    constructor(private reporteRepository: ReporteRepository){}

    execute(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseApi<ResponseConsultarReporteEsperaDto>> {
        return this.reporteRepository.consultarReporteEnEspera(payload);
    }

}