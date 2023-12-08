import { UseCase } from "../../../kernel/contracts";
import { votarReporteDTO } from "../adapters/dtos/votar-reporte.dto";
import { ResponseConsultarVotoPorUsuarioDTO } from "../adapters/dtos/response-consultar-voto-por-usuario.dto";
import { ReporteRepository } from "./ports/reporte.repository";



export class ConsultarVotoPorUsuarioInteractor implements UseCase<votarReporteDTO,ResponseConsultarVotoPorUsuarioDTO>{
    constructor(private repository: ReporteRepository){}
    
    execute(payload: votarReporteDTO): Promise<ResponseConsultarVotoPorUsuarioDTO> {
        return this.repository.consultarVotoPorUsuario(payload);
    }
}