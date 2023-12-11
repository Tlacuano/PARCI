import { UseCase } from "../../../kernel/contracts";
import { ReporteRepository } from './ports/reporte.repository';
import { insertReporteDTO } from "../adapters/dtos/registrar-reporte.dto";


export class InsertReporteInteractor implements UseCase<insertReporteDTO, boolean> {
    constructor(private readonly reporteRepository: ReporteRepository) {}

    async execute(payload: insertReporteDTO): Promise<boolean> {

        if(payload.titulo === "" || payload.titulo === undefined || payload.titulo === null){
            throw new Error("El titulo del reporte es requerido")
        }

        if(payload.descripcion === "" || payload.descripcion === undefined || payload.descripcion === null){
            throw new Error("La descripcion del reporte es requerido")
        }

        if(payload.imagen === "" || payload.imagen === undefined || payload.imagen === null){
            throw new Error("La imagen del reporte es requerido")
        }

        if(payload.fk_idCategoria === undefined || payload.fk_idCategoria === null){
            throw new Error("La categoria del reporte es requerido")
        }

        
        return this.reporteRepository.insertReporte(payload);
    }
}