import { UseCase } from '../../../kernel/contracts';
import { ReporteRepository } from '../use-cases/ports/reporte.repository';

export class EliminarReporteInteractor implements UseCase<number, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(id_reporte: number): Promise<boolean> {

        if(typeof id_reporte !== 'number' || isNaN(id_reporte)){
            throw new Error("El id del reporte no puede estar vacio..")
        }

        return await this.repository.deleteReporte(id_reporte);
    }
}