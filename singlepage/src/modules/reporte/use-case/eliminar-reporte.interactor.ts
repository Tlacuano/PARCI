import { UseCase } from "../../../kernel/contracts";
import { RequestEliminarReporteDTO } from "../adapters/dtos/request-eliminar-reporte.dto";
import { ResponseApi } from "../../../kernel/types";
import { ReporteRepository } from "./ports/reporte.repository";




export class EliminarReporteInteractor implements UseCase<RequestEliminarReporteDTO,ResponseApi<boolean>>{
    constructor(private reporteRepository: ReporteRepository){}

    execute(payload: RequestEliminarReporteDTO): Promise<ResponseApi<boolean>> {
        return this.reporteRepository.eliminarReporte(payload);
    }
}