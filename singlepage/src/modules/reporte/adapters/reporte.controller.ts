import { ResponseApi } from "../../../kernel/types";
import { ConsultarReporteEnEsperaInteractor } from "../use-case/consultar-reporte-en-espera.interactor";
import { ConsultarReporteUsuarioInteractor } from "../use-case/consultar-reporte-usuario.interactor";
import { ConsultarReportesEnEsperaInteractor } from "../use-case/consultar-reportes-en-espera.interactor";
import { ModificarEstadoReporte } from "../use-case/modificar-estado-reporte.interactor";
import { ModificarReporteInteractor } from "../use-case/modificar-reporte.interactor";
import { ObtenerReportesInteractor } from "../use-case/obtener-reportes.interactor";
import { ReporteRepository } from "../use-case/ports/reporte.repository";
import { RegistrarReporteInteractor } from "../use-case/registrar-reporte.interactor";
import { VotarReporteInteractor } from "../use-case/votar-reporte.interactor";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { NuevoEstadoReporteDTO } from "./dtos/nuevo-estado-reporte.dto";
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

    consultarReportesEnEspera = async () => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const consultarReportesEnEsperaInteractor = new ConsultarReportesEnEsperaInteractor(repositorio);

            const respuesta = await consultarReportesEnEsperaInteractor.execute(null);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    modificarReporte = async (payload: modifyReporteDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const modificarReporteInteractor = new ModificarReporteInteractor(repositorio);

            const respuesta = await modificarReporteInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    consultarReporteEnEspera = async (payload: RequestConsultarReporteUsuarioDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const consultarReporteEnEsperaInteractor = new ConsultarReporteEnEsperaInteractor(repositorio);

            const respuesta = await consultarReporteEnEsperaInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    modficarEstadoReporte = async (payload: NuevoEstadoReporteDTO) => {
        try {
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const modificarEstadoReporteInteractor = new ModificarEstadoReporte(repositorio);

            const respuesta = await modificarEstadoReporteInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }

    }

}