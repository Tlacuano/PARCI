import { UseCase } from "../../../kernel/contracts";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class ObtenerReportePorFechaInteractor implements UseCase<Date, Reporte[]>{
    constructor(private readonly reporteRepository:ReporteRepository){}

    async execute(fecha: Date): Promise<Reporte[]> {
        if(!fecha){
            throw new Error("Fecha incompleta..")
        }
        return await this.reporteRepository.obtenerReportePorFecha(fecha);
    }

}