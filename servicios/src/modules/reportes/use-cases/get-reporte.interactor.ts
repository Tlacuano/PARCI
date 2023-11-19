import { UseCase } from "src/kernel/contracts";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "./ports/reporte.repository";

export class GetReporteInteractor implements UseCase<null, Reporte[]>{
    constructor(private ReporteRepository:ReporteRepository){}

    execute(payload: null): Promise<Reporte[]> {
        throw new Error("Method not implemented.");
    }

}