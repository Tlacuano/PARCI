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

        payload.opinion = payload.opinion.trim();

        const splitFecha = payload.fecha.split('/');
        payload.fecha = `${splitFecha[2]}-${splitFecha[1]}-${splitFecha[0]}`;

        if(payload.fecha === '' || payload.fecha === undefined){
            throw new Error('Campos requeridos incompletos');
        }


        return this.opinionesRepository.registrarOpinion(payload);
    }
}