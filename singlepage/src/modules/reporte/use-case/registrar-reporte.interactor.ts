import { UseCase } from "../../../kernel/contracts";
import { ResponseApi } from "../../../kernel/types";
import { insertReporteDTO } from "../adapters/dtos/registrar-reporte.dto";
import { ReporteRepository } from "./ports/reporte.repository";



export class RegistrarReporteInteractor  implements UseCase<insertReporteDTO,ResponseApi<string>>{
    constructor(private repository: ReporteRepository) { }

    execute(payload: insertReporteDTO): Promise<ResponseApi<string>> {
        return this.repository.registrarReporte(payload);
    }
}
    
