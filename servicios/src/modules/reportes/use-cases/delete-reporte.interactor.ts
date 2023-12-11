import { UseCase } from '../../../kernel/contracts';
import { RequestEliminarReporteDTO } from '../adapters/dtos/request-eliminar-reporte.dto';
import { ReporteRepository } from '../use-cases/ports/reporte.repository';

export class EliminarReporteInteractor implements UseCase<RequestEliminarReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(id_reporte: RequestEliminarReporteDTO): Promise<boolean> {

        return await this.repository.deleteReporte(id_reporte);
    }
}