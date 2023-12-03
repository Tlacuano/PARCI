import { ResponseApi } from "../../../kernel/types";
import { ObtenerReportesInteractor } from "../use-case/obtener-reportes.interactor";
import { ReporteRepository } from "../use-case/ports/reporte.repository";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ReporteStorageGateway } from "./reporte.storage.gateway";


export class ReporteController {
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message
        } as ResponseApi<any>
    }

    obtenerReportes = async (payload: ObtenerReporteDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const obtenerReportesInteractor = new ObtenerReportesInteractor(repositorio);

            const respuesta = await obtenerReportesInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }
}