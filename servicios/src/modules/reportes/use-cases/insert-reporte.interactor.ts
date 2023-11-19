import { UseCase } from "src/kernel/contracts";
import { ReporteRepository } from './ports/reporte.repository';
import { insertReporteDTO } from "../adapters/dtos/registrar-reporte.dto";


export class InsertReporteInteractor implements UseCase<insertReporteDTO, boolean> {
    constructor(private reporteRepository: ReporteRepository) {}

    async execute(payload: insertReporteDTO): Promise<boolean> {
        return this.reporteRepository.insertReporte(payload);
    }
}