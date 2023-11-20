import { ReporteRepository } from "./ports/reporte.repository";
import { UseCase } from "../../../kernel/contracts";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";

export class VotarReporteInteractor implements UseCase<votarReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(payload: votarReporteDTO): Promise<boolean> {
    
        if(!payload.id_reporte){
            throw new Error("El id del reporte es requerido");
        }

        if((payload.votos_positivos !== undefined && payload.votos_negativos !== undefined) || (payload.votos_positivos === undefined && payload.votos_negativos === undefined)){
            throw new Error("Solo se puede asignar un tipo de voto: positivo o negativo.")
        }

    return this.repository.votarReporte(payload);
    }
}