import { ResponseApi } from "@/kernel/types";
import { OpinionRepository } from "../use-cases/ports/opinon.repository";
import { RequestRegistrarOpinionDto } from "./dto/request-registrar-opinion.dto";
import api from '../../../config/http-client.gateway';
import { Opinion } from "../entities/opinion";
import { VotarOpinionDto } from "./dto/request-votar-opinion.dto";
import { RequestEliminarOpinionDto } from "./dto/request-eliminar-opinion.dto";



export class OpinionStorageGateway implements OpinionRepository{

    async registrarOpinion(payload: RequestRegistrarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        const respuesta = await api.doPost('/opiniones/registrar-opinion', payload);
        return{
            ...respuesta.data
        } as ResponseApi<Opinion[]>
    }

    async votarOpinion(payload: VotarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        const respuesta = await api.doPost('/opiniones/votar-opinion', payload);
        return{
            ...respuesta.data
        } as ResponseApi<Opinion[]>
    }

    async eliminarOpinion(payload: RequestEliminarOpinionDto): Promise<ResponseApi<Opinion[]>> {
        
        const respuesta = await api.doPost('/opiniones/eliminar-opinion', payload);
        return{
            ...respuesta.data
        } as ResponseApi<Opinion[]>
    }

}