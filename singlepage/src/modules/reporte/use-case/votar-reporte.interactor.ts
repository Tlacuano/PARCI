import { ResponseApi } from "../../../kernel/types";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";
import { UseCase } from "../../../kernel/contracts";
import { ReporteRepository } from "./ports/reporte.repository";
import { insertReporteDTO } from "../adapters/dtos/registrar-reporte.dto";



export class VotarReporteInteractor implements UseCase<votarReporteDTO,ResponseApi<boolean>>{
    constructor(private repository: ReporteRepository) { }

    execute(payload: votarReporteDTO): Promise<ResponseApi<boolean>> {
        return this.repository.votarReporte(payload);
    } 
}