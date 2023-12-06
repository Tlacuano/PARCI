import { UseCase } from "../../../kernel/contracts";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";



export class EliminarVotoReporteInteractor implements UseCase<votarReporteDTO,boolean>{
    constructor (private reportesRepository : ReporteRepository){}

    execute(payload: votarReporteDTO): Promise<boolean> {
        return this.reportesRepository.eliminarVotoReporte(payload);
    }
}