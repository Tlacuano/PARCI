import { Opinion } from '../entities/opinion';
import { UseCase } from './../../../kernel/contracts';
import { OpinionesRepository } from './ports/opiniones.repository';




export class ConsultarOpinionesByReporteIdInteractor implements UseCase<number,Opinion[]>{
    constructor(private opinionesRepository: OpinionesRepository) { }

    execute(payload: number): Promise<Opinion[]> {
        return this.opinionesRepository.consultarOpinionesByReporteId(payload);
    }
}