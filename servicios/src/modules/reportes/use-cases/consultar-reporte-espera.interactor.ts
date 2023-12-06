import { UseCase } from "../../../kernel/contracts";
import { RequestConsultarReporteUsuarioDTO } from "../adapters/dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteEsperaDto } from "../adapters/dtos/response-consultar-reporte-espera.dto";
import { ReporteRepository } from "./ports/reporte.repository";




export class ConsultarReporteEnEsperaInteractor implements UseCase<RequestConsultarReporteUsuarioDTO,ResponseConsultarReporteEsperaDto>{
    constructor(private repository: ReporteRepository){}
    
    execute(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteEsperaDto> {
        return this.repository.consultarReporteEnEspera(payload);
    }

}