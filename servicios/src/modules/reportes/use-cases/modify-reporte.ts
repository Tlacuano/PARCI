import { modifyReporteDTO } from "../adapters/dtos/modify-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";
import { UseCase } from "src/kernel/contracts";


export class ModificarReporteInteractor implements UseCase<modifyReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(payload: modifyReporteDTO): Promise<boolean> {
        return this.repository.insertReporte(payload);
    }
}