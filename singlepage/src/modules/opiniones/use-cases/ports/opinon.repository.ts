import { ResponseApi } from "../../../../kernel/types";
import { RequestEliminarOpinionDto } from "../../adapters/dto/request-eliminar-opinion.dto";
import { RequestRegistrarOpinionDto } from "../../adapters/dto/request-registrar-opinion.dto";
import { VotarOpinionDto } from "../../adapters/dto/request-votar-opinion.dto";
import { Opinion } from "../../entities/opinion";


export interface OpinionRepository {
    registrarOpinion(payload:RequestRegistrarOpinionDto): Promise<ResponseApi<Opinion[]>>;
    votarOpinion(payload: VotarOpinionDto) : Promise<ResponseApi<Opinion[]>>;
    eliminarOpinion(payload: RequestEliminarOpinionDto) : Promise<ResponseApi<Opinion[]>>;
}