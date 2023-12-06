import { UseCase } from "../../../kernel/contracts";
import { VotarOpinionDto } from "../adapters/dto/request-votar-opinion.dto";
import { OpinionesRepository } from "./ports/opiniones.Repository";




export class RegistrarVotoOpinionInteractor implements UseCase<VotarOpinionDto,boolean>{
    constructor (private opinionesRepository : OpinionesRepository){}
    
    execute(payload: VotarOpinionDto): Promise<boolean> {
        return this.opinionesRepository.registrarVotoOpinion(payload);
    }
}