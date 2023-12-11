import { modifyReporteDTO } from "../adapters/dtos/modify-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";
import { UseCase } from "../../../kernel/contracts";


export class ModificarReporteInteractor implements UseCase<modifyReporteDTO, boolean> {
    constructor(private readonly repository: ReporteRepository) { }

    async execute(payload: modifyReporteDTO): Promise<boolean> {
    
        if(!payload.id_reporte){
            throw new Error("El id del reporte es requerido");
        }

        if(!payload.titulo){
            throw new Error("El titulo del reporte es requerido");
        }

        if(!payload.descripcion){
            throw new Error("La descripcion del reporte es requerido");
        }

        

    return this.repository.modificarReporte(payload);
    }
}