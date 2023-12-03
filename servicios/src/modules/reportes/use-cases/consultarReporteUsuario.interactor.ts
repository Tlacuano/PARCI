import { ReporteRepository } from './ports/reporte.repository';
import { RequestConsultarReporteUsuarioDTO } from './../adapters/dtos/request-consultar-reporte-usuario.dto';
import { UseCase } from "../../../kernel/contracts";
import { ResponseConsultarReporteUsuarioDTO } from '../adapters/dtos/response-consultar-reporte-usuario.dto';




export class ConsultarReporteUsuarioInteractor implements UseCase<RequestConsultarReporteUsuarioDTO,ResponseConsultarReporteUsuarioDTO>{
    constructor(private repository: ReporteRepository){}
    
    execute(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteUsuarioDTO> {
        return this.repository.consultarReporteUsuario(payload);
    }
}