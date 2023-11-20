import { Opinion } from '../entities/opinion';
import { UseCase } from './../../../kernel/contracts';
import { OpinionesRepository } from './ports/opiniones.Repository';




export class ConsultarOpinionesByReporteIdInteractor implements UseCase<number,Opinion[]>{
    constructor(private opinionesRepository: OpinionesRepository) { }

    execute(payload: number): Promise<Opinion[]> {
        if(payload === 0 || payload === undefined){
            throw new Error('Campos requeridos incompletos');
        }

        return this.opinionesRepository.consultarOpinionesByReporteId(payload);
    }
}