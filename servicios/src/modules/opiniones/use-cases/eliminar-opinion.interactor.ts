import { UseCase } from "../../../kernel/contracts";
import { RequestEliminarOpinionDto } from "../adapters/dto/request-eliminar-opinion.dto";
import { OpinionesRepository } from "./ports/opiniones.Repository";



export class EliminarOpinionInteractor implements UseCase<RequestEliminarOpinionDto,boolean>{
    constructor(private opinionesRepository: OpinionesRepository){}

    execute(payload: RequestEliminarOpinionDto): Promise<boolean> {
        if(payload.id_opinion === 0 || payload.id_opinion === undefined){
            throw new Error('Campos requeridos incompletos');
        }
        return this.opinionesRepository.eliminarOpinion(payload);
    }
}