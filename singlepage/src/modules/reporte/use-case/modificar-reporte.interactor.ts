import { UseCase } from "../../../kernel/contracts";
import { modifyReporteDTO } from "../adapters/dtos/modify-reporte.dto";
import { ResponseApi } from "../../../kernel/types";
import { ReporteRepository } from "./ports/reporte.repository";



export class ModificarReporteInteractor implements UseCase<modifyReporteDTO,ResponseApi<boolean>>{
    constructor(private reporteRepository: ReporteRepository){}

    execute(payload: modifyReporteDTO): Promise<ResponseApi<boolean>> {
        return this.reporteRepository.modificarReporte(payload);
    }
    
}