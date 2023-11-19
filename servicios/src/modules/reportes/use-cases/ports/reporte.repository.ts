import { Reporte } from "../../entities/reporte";
import { insertReporteDTO} from "../../adapters/dtos/registrar-reporte.dto";


export interface ReporteRepository {
    insertReporte(payload: insertReporteDTO): Promise<boolean>;

}
