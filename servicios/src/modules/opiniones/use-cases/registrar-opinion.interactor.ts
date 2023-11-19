import { UseCase } from "../../../kernel/contracts";
import { RequestRegistrarOpinionDto } from "../adapters/dto/request-registrar-opinion.dto";
import { OpinionesRepository } from "./ports/opiniones.repository";



export class RegistrarOpinonInteractor implements UseCase<RequestRegistrarOpinionDto,boolean>{
    constructor(private opinionesRepository: OpinionesRepository) { }

    execute(payload: RequestRegistrarOpinionDto): Promise<boolean> {
        return this.opinionesRepository.registrarOpinion(payload);
    }
}