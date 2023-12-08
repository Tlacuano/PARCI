import { ReporteRepository } from "./ports/reporte.repository";
import { UseCase } from "../../../kernel/contracts";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";

export class VotarReporteInteractor implements UseCase<votarReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(payload: votarReporteDTO): Promise<boolean> {
        if(!payload.id_reporte){
            throw new Error("El id del reporte es requerido");
        }
        if(!payload.usuario){
            throw new Error("El id del usuario es requerido");
        }
        if(!payload.voto){
            throw new Error("El voto es requerido");
        }


        return this.repository.votarReporte(payload);
    }
}