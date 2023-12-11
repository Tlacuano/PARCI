import { UseCase } from "../../../kernel/contracts";
import { NuevoEstadoReporteDTO } from "../adapters/dtos/nuevo-estado-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";




export class ModificarEstadoReporteInteractor implements UseCase<NuevoEstadoReporteDTO,boolean>{
    constructor(private readonly reporteRepository: ReporteRepository) {}
    
    execute(payload: NuevoEstadoReporteDTO): Promise<boolean> {
        return this.reporteRepository.modificarEstadoReporte(payload);
    }

}