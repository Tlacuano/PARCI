import { ReporteRepository } from "./ports/reporte.repository";
import { UseCase } from "../../../kernel/contracts";
import { modificarEstadoReporteDTO } from "../adapters/dtos/modificar-estado-reporte.dto";

export class ModificarEstadoReporteInteractor implements UseCase<modificarEstadoReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(payload: modificarEstadoReporteDTO): Promise<boolean> {
    
        if(!payload.id_reporte){
            throw new Error("El id del reporte es requerido");
        }

        if(!payload.estado){
            throw new Error("El estado del reporte es requerido");
        }
        
    return this.repository.modificarEstadoReporte(payload);
    }
}