import { RequestConsultarReportesDto } from '../adapters/dto/request-consultar-reportes.dto';
import { Opinion } from '../entities/opinion';
import { UseCase } from './../../../kernel/contracts';
import { OpinionesRepository } from './ports/opiniones.Repository';




export class ConsultarOpinionesByReporteIdInteractor implements UseCase<RequestConsultarReportesDto,Opinion[]>{
    constructor(private opinionesRepository: OpinionesRepository) { }

    execute(payload: RequestConsultarReportesDto): Promise<Opinion[]> {
        if(payload.fk_idReporte === 0 || payload.fk_idReporte === undefined){
            throw new Error('Campos requeridos incompletos');
        }

        return this.opinionesRepository.consultarOpinionesByReporteId(payload);
    }
}