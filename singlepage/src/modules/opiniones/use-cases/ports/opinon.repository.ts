import { ResponseApi } from "../../../../kernel/types";
import { RequestRegistrarOpinionDto } from "../../adapters/dto/request-registrar-opinion.dto";
import { Opinion } from "../../entities/opinion";


export interface OpinionRepository {
    registrarOpinion(payload:RequestRegistrarOpinionDto): Promise<ResponseApi<Opinion[]>>;
}