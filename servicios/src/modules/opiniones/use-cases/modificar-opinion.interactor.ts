import { regexValidationNoEspaciosInicioFin, validateRegex } from "../../../kernel/validation";
import { UseCase } from "../../../kernel/contracts";
import { RequestModificarOpinionDto } from "../adapters/dto/request-modificar-opinion.dto";
import { OpinionesRepository } from "./ports/opiniones.Repository";



export class ModificarOpinionInteractor implements UseCase<RequestModificarOpinionDto,boolean>{
    constructor(private opinionesRepository: OpinionesRepository){}

    execute(payload: RequestModificarOpinionDto): Promise<boolean> {

        if(payload.id_opinion === 0 || payload.id_opinion === undefined){
            throw new Error('Campos requeridos incompletos');
        }

        if(payload.opinion === '' || payload.opinion === undefined){
            throw new Error('No se puede dejar una opinion vacia');
        }

        if(validateRegex(regexValidationNoEspaciosInicioFin,payload.opinion)){
            throw new Error('No se puede dejar espacios al inicio o al final');
        }

        return this.opinionesRepository.modificarOpinion(payload);
    }

}