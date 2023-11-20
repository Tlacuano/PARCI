import { Request, Response, Router } from "express";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { ReporteStorageGateway } from "./reporte.storage.gateway";
import { ResponseApi } from "../../../kernel/types";
import { Reporte } from "../entities/reporte";
import { validarError } from "../../../kernel/error-handler";
import { GetReporteInteractor} from "../use-cases/get-reporte.interactor";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { ModificarReporteInteractor } from "../use-cases/modify-reporte.interactor";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { InsertReporteInteractor} from './../use-cases/insert-reporte.interactor';
import { EliminarReporteInteractor } from "../use-cases/delete-reporte.interactor";
import { ObtenerReportePorFechaInteractor } from './../use-cases/obtener-reporte-fecha.interactor';
import { ObtenerReportePorCategoriaInteractor } from "./../use-cases/obtener-reporte-categoria.interactor";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { VotarReporteInteractor } from './../use-cases/votar-reporte.interactor';
import { ModificarEstadoReporteInteractor } from "../use-cases/modificar-estado-reporte.interactor";
import { modificarEstadoReporteDTO } from "./dtos/modificar-estado-reporte.dto";

const reporteRouter = Router();

export class ReporteController {

    obtenerReporte = async (_req: Request, res: Response) => {
        try {
            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new GetReporteInteractor(repository);
            const result = await interactor.execute(null);

            const body: ResponseApi<Reporte[]> = {
                data: result,
                message: 'Los reportes han sido encontrados',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    //obtener reporte por fecha
    obtenerReporteFecha = async (_req: Request, res: Response) => {
        try {
            const {fecha} = _req.body

            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ObtenerReportePorFechaInteractor(repository);

            const result = await interactor.execute(fecha);

            const body: ResponseApi<Reporte[]> = {
                data: result,
                message: 'Los reportes de la fecha indicada han sido encontrados',
                error: false,
                status: 200, 
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    //obtener reporte por fecha
    obtenerReporteCategoria = async (_req: Request, res: Response) => {
        try {
            const {fk_idCategoria} = _req.body

            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ObtenerReportePorCategoriaInteractor(repository);

            const result = await interactor.execute(fk_idCategoria);

            const body: ResponseApi<Reporte[]> = {
                data: result,
                message: 'Los reportes de la categoria indicada han sido encontrados',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    obtenerReportesEnEspera = async (_req: Request, res: Response) => {
        try {
            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new GetReporteInteractor(repository);
            const result = await interactor.execute(null);

            const body: ResponseApi<Reporte[]> = {
                data: result,
                message: 'Los reportes en espera han sido encontrados',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    registrarReporte = async (_req: Request, res: Response) => {
        try {
            const payload = _req.body as insertReporteDTO;

            const repository: ReporteRepository = new ReporteStorageGateway();
            const interactor = new InsertReporteInteractor(repository);

            const result = await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: result,
                message: 'El reporte ha sido registrado correctamente',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);

        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    modificarReporte = async (req: Request, res: Response) => {
        try {
            const payload = req.body as modifyReporteDTO;

            const repository: ReporteRepository = new ReporteStorageGateway();
            const modificarReporteInteractor = new ModificarReporteInteractor(repository);

            await modificarReporteInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Reporte modificado correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    eliminarReporte = async (req: Request, res: Response) => {
        try {
            const { id_reporte } = req.body;
            const repository: ReporteRepository = new ReporteStorageGateway();
            const eliminarReporteInteractor = new EliminarReporteInteractor(repository);
    
            await eliminarReporteInteractor.execute(id_reporte);
            
            const body: ResponseApi<boolean> = {
                data: true,
                message: "Reporte eliminado correctamente",
                status: 200,
                error: false,
            };
    
            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    votarReporte = async (_req: Request, _res: Response) => {
        try{
            const payload = _req.body as votarReporteDTO;

            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new VotarReporteInteractor(repository);

            const result = await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: result,
                message: 'Se a votado satisfactoriamente en el reporte',
                error: false,
                status: 200, 
            };

            _res.status(body.status).json(body);
        
        } catch (error){
            const errorBody = validarError(error as Error);
            _res.status(errorBody.status).json(errorBody);
        }
    }

    //moderador
    modificarEstadoReporte = async (_req: Request, _res: Response) => {
        try{
            const payload = _req.body as modificarEstadoReporteDTO;

            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ModificarEstadoReporteInteractor(repository);

            await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Se a modificado el estado del reporte',
                error: false,
                status: 200, 
            };

            _res.status(body.status).json(body);
        
        } catch (error){
            const errorBody = validarError(error as Error);
            _res.status(errorBody.status).json(errorBody);
        }
    }

}

const reporteController = new ReporteController();

reporteRouter.get('/consultar', reporteController.obtenerReporte);
reporteRouter.get('/consultar-en-espera', reporteController.obtenerReporte);
reporteRouter.get('/consultar-por-fecha', reporteController.obtenerReporteFecha);
reporteRouter.get('/consultar-por-categoria', reporteController.obtenerReporteCategoria);
reporteRouter.put('/modificar', reporteController.modificarReporte);
reporteRouter.post('/registrar', reporteController.registrarReporte);
reporteRouter.delete('/eliminar', reporteController.eliminarReporte);
reporteRouter.put('/votar', reporteController.votarReporte);
reporteRouter.put('/modificar-estado', reporteController.modificarEstadoReporte);

export default reporteRouter;
