import { ResponseReportesEnEsperaDto } from './../adapters/dtos/response-consultar-reportes-espera.dto';
import { UseCase } from "../../../kernel/contracts";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class ObtenerReportesEnEsperaInteractor implements UseCase<null, ResponseReportesEnEsperaDto[]>{
    constructor(private reporteRepository:ReporteRepository){}

    async execute(payload: null): Promise<ResponseReportesEnEsperaDto[]> {
        return await this.reporteRepository.obtenerReportesEnEspera();
    }

}