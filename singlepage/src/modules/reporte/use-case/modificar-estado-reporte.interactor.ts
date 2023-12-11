import { UseCase } from "../../../kernel/contracts";
import { ResponseApi } from "../../../kernel/types";
import { NuevoEstadoReporteDTO } from "../adapters/dtos/nuevo-estado-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";




export class ModificarEstadoReporte implements UseCase<NuevoEstadoReporteDTO,ResponseApi<boolean>>{
    constructor(private reporteRepository: ReporteRepository){}

    execute(payload: NuevoEstadoReporteDTO): Promise<ResponseApi<boolean>> {
        return this.reporteRepository.modificarEstadoReporte(payload);
    }

}