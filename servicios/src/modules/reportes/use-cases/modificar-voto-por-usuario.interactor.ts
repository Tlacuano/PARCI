import { UseCase } from "../../../kernel/contracts";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";




export class ModificarVotoPorUsuario implements UseCase<votarReporteDTO,boolean>{
    constructor(private repository: ReporteRepository){}

    execute(payload: votarReporteDTO): Promise<boolean> {
        return this.repository.modificarVotoPorUsuario(payload);
    }

}