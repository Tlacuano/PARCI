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
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { VotarReporteInteractor } from './../use-cases/votar-reporte.interactor';
import { ModificarEstadoReporteInteractor } from "../use-cases/modificar-estado-reporte.interactor";
import { modificarEstadoReporteDTO } from "./dtos/modificar-estado-reporte.dto";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesEnEsperaInteractor } from "../use-cases/obtener-reportes-en-espera.interactor";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";

const reporteRouter = Router();

export class ReporteController {

    getReporte = async (_req: Request, res: Response) => {
        try {
            const payload = _req.body as ObtenerReporteDTO;
            
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const getReporteInteractor = new GetReporteInteractor(repositorio);

            const reportes = await getReporteInteractor.execute(payload);
            
            

            const body: ResponseApi<ObtenerReportesDTO[]> = {
                data: reportes,
                message: 'Los reportes han sido encontradas esplendidamente',
                error: false,
                status: 200,
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    obtenerReportesEnEspera = async (_req: Request, res: Response) => {
        try {
            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ObtenerReportesEnEsperaInteractor(repository);
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

reporteRouter.post('/consultar', reporteController.getReporte);
reporteRouter.get('/consultar-en-espera', reporteController.obtenerReportesEnEspera);
reporteRouter.put('/modificar', reporteController.modificarReporte);
reporteRouter.post('/registrar', reporteController.registrarReporte);
reporteRouter.delete('/eliminar', reporteController.eliminarReporte);
reporteRouter.put('/votar', reporteController.votarReporte);
reporteRouter.put('/modificar-estado', reporteController.modificarEstadoReporte);

export default reporteRouter;
