import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { Opinion } from "../entities/opinion";
import { VotarOpinionDto } from "../adapters/dto/request-votar-opinion.dto";
import { OpinionRepository } from "./ports/opinon.repository";




export class VotarOpinionInteractor implements UseCase<VotarOpinionDto,ResponseApi<Opinion[]>> {
    constructor(private opinionRepository: OpinionRepository) { }

    execute(payload: VotarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        return this.opinionRepository.votarOpinion(payload);
    }


}