import { UseCase } from "../../../kernel/contracts";
import { VotarOpinionDto } from "../adapters/dto/request-votar-opinion.dto";
import { ResponseVotoOpinionDto } from "../adapters/dto/response-consultar-voto-usuario-opinioin.dto";
import { OpinionesRepository } from "./ports/opiniones.Repository";




export class ConsultarVotoPorUsuarioOpinionInteractor implements UseCase<VotarOpinionDto,ResponseVotoOpinionDto>{
    constructor (private opinionesRepository : OpinionesRepository){}
    
    execute(payload: VotarOpinionDto): Promise<ResponseVotoOpinionDto> {
        return this.opinionesRepository.consultarVotoOpinion(payload);
    }
}