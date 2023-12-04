import { ResponseApi } from "../../../kernel/types";
import { ConsultarReporteUsuarioInteractor } from "../use-case/consultar-reporte-usuario.interactor";
import { ObtenerReportesInteractor } from "../use-case/obtener-reportes.interactor";
import { ReporteRepository } from "../use-case/ports/reporte.repository";
import { RegistrarReporteInteractor } from "../use-case/registrar-reporte.interactor";
import { VotarReporteInteractor } from "../use-case/votar-reporte.interactor";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { RequestConsultarReporteUsuarioDTO } from "./dtos/request-consultar-reporte-usuario.dto";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
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

    consultarReporteUsuario = async (payload: RequestConsultarReporteUsuarioDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const consultarReporteUsuarioInteractor = new ConsultarReporteUsuarioInteractor(repositorio);

            const respuesta = await consultarReporteUsuarioInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    registrarReporte = async (payload: insertReporteDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const registrarReporteInteractor = new RegistrarReporteInteractor(repositorio);

            const respuesta = await registrarReporteInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    votarReporte = async (payload: votarReporteDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const votarReporteInteractor = new VotarReporteInteractor(repositorio);

            const respuesta = await votarReporteInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }
}