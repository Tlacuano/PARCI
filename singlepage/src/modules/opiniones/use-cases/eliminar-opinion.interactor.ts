import { ResponseApi } from "@/kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { RequestEliminarOpinionDto } from "../adapters/dto/request-eliminar-opinion.dto";
import { Opinion } from "../entities/opinion";
import { OpinionRepository } from "./ports/opinon.repository";




export class EliminarOpinionInteractor implements UseCase<RequestEliminarOpinionDto,ResponseApi<Opinion[]>> {
    constructor(private opinionRepository: OpinionRepository) { }

    execute(payload: RequestEliminarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        return this.opinionRepository.eliminarOpinion(payload);
    }

}