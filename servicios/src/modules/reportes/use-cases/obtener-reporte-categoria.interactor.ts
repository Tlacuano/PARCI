import { UseCase } from "../../../kernel/contracts";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class ObtenerReportePorCategoriaInteractor implements UseCase<number, Reporte[]>{
    constructor(private readonly reporteRepository:ReporteRepository){}

    async execute(fk_idCategoria: number): Promise<Reporte[]> {
        if(!fk_idCategoria){
            throw new Error("Campo requerido incompleto..")
        }
        return await this.reporteRepository.obtenerReportePorCategoria(fk_idCategoria);
    }

}