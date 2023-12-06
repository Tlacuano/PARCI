import { UseCase } from "../../../kernel/contracts";
import { ResponseApi } from "../../../kernel/types";
import { ResponseReportesEnEsperaDto } from "../adapters/dtos/response-consultar-reportes-espera.dto";
import { ReporteRepository } from "./ports/reporte.repository";



export class ConsultarReportesEnEsperaInteractor implements UseCase<null,ResponseApi<ResponseReportesEnEsperaDto[]>>{
    constructor(private reporteRepository: ReporteRepository){}

    
    execute(payload:null): Promise<ResponseApi<ResponseReportesEnEsperaDto[]>> {
        return this.reporteRepository.consultarReportesEnEspera(null);
    }

}