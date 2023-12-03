import { UseCase } from "../../../kernel/contracts";
import { ResponseApi } from "../../../kernel/types";
import { ObtenerReporteDTO } from "../adapters/dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "../adapters/dtos/reponse-get-reporte";
import { ReporteRepository } from "./ports/reporte.repository";




export class ObtenerReportesInteractor implements UseCase<ObtenerReporteDTO,ResponseApi<ObtenerReportesDTO[]>>{
    constructor(private readonly reporteRepository: ReporteRepository){}

    execute(payload: ObtenerReporteDTO): Promise<ResponseApi<ObtenerReportesDTO[]>> {
        return this.reporteRepository.getReporte(payload);
    }
}