import { UseCase } from "../../../kernel/contracts";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class GetReporteInteractor implements UseCase<null, Reporte[]>{
    constructor(private reporteRepository:ReporteRepository){}

    async execute(payload: null): Promise<Reporte[]> {
        return await this.reporteRepository.obtenerReporte();
    }

}