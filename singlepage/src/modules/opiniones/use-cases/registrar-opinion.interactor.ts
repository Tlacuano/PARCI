import { UseCase } from "../../../kernel/contracts";
import { RequestRegistrarOpinionDto } from "../adapters/dto/request-registrar-opinion.dto";
import { ResponseApi } from "../../../kernel/types";
import { OpinionRepository } from "./ports/opinon.repository";
import { Opinion } from "../entities/opinion";




export class RegistrarOpinionInteractor implements UseCase<RequestRegistrarOpinionDto,ResponseApi<Opinion[]>>{
    constructor(private opinionRepository : OpinionRepository){}

    execute(payload: RequestRegistrarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        return this.opinionRepository.registrarOpinion(payload);
    }

}