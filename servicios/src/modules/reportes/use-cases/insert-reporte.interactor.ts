import { UseCase } from "../../../kernel/contracts";
import { ReporteRepository } from './ports/reporte.repository';
import { insertReporteDTO } from "../adapters/dtos/registrar-reporte.dto";


export class InsertReporteInteractor implements UseCase<insertReporteDTO, boolean> {
    constructor(private readonly reporteRepository: ReporteRepository) {}

    async execute(payload: insertReporteDTO): Promise<boolean> {

        if(!payload.fecha){
            throw new Error("La fecha del reporte no puede estar vacio..")
        }

        if(payload.titulo === ""){
            throw new Error("El titulo del reporte no puede estar vacio..")
        }

        if(payload.imagen === ""){
            throw new Error("La imagen del reporte no puede estar vacio..")
        }

        if(payload.fk_idMunicipio === null){
            throw new Error("El municipio del reporte no puede estar vacio..")
        }
        
        return this.reporteRepository.insertReporte(payload);
    }
}