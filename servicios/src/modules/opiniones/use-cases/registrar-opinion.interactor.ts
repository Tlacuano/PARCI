import { regexValidationNoEspaciosInicioFin, validateRegex } from "../../../kernel/validation";
import { UseCase } from "../../../kernel/contracts";
import { RequestRegistrarOpinionDto } from "../adapters/dto/request-registrar-opinion.dto";
import { OpinionesRepository } from "./ports/opiniones.Repository";



export class RegistrarOpinonInteractor implements UseCase<RequestRegistrarOpinionDto,boolean>{
    constructor(private opinionesRepository: OpinionesRepository) { }

    execute(payload: RequestRegistrarOpinionDto): Promise<boolean> {
        if(payload.fk_idReporte === 0 || payload.fk_idReporte === undefined){
            throw new Error('Campos requeridos incompletos');
        }

        if(payload.opinion === '' || payload.opinion === undefined){
            throw new Error('No se puede dejar una opinion vacia');
        }

        if(validateRegex(regexValidationNoEspaciosInicioFin,payload.opinion)){
            throw new Error('No se puede dejar espacios al inicio o al final');
        }

        //validar que la fecha no sea mayor a la actual
        const fechaActual = new Date();
        const fechaOpinion = new Date(payload.fecha);

        if(fechaActual < fechaOpinion){
            throw new Error('La fecha de la opinion no puede ser mayor a la actual');
        }

        if(payload.fecha === '' || payload.fecha === undefined){
            throw new Error('Campos requeridos incompletos');
        }


        return this.opinionesRepository.registrarOpinion(payload);
    }
}