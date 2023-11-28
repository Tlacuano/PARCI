import { UseCase } from "../../../kernel/contracts";
import { ObtenerReporteDTO } from "../adapters/dtos/obtener-reporte.dto";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class GetReporteInteractor implements UseCase<ObtenerReporteDTO, Reporte[]>{
    constructor(private reporteRepository:ReporteRepository){}

    async execute(payload: ObtenerReporteDTO): Promise<Reporte[]> {
        return await this.reporteRepository.getReporte(payload);
    }

}