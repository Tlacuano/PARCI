import { UseCase } from "../../../kernel/contracts";
import { ObtenerReporteDTO } from "../adapters/dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "../adapters/dtos/reponse-get-reporte";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class GetReporteInteractor implements UseCase<ObtenerReporteDTO, ObtenerReportesDTO[]>{
    constructor(private reporteRepository:ReporteRepository){}

    async execute(payload: ObtenerReporteDTO): Promise<ObtenerReportesDTO[]> {
        return await this.reporteRepository.getReporte(payload);
    }

}