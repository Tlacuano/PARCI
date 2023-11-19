import { Request, Response, Router } from "express";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { ReporteStorageGateway } from "./reporte.storage.gateway";
import { ResponseApi } from "src/kernel/types";
import { Reporte } from "../entities/reporte";
import { validarError } from "src/kernel/error-handler";
import { GetReporteInteractor} from "../use-cases/get-reporte.interactor";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { ModificarReporteInteractor } from "../use-cases/modify-reporte";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { InsertReporteInteractor} from './../use-cases/insert-reporte.interactor';

const reporteRouter = Router();

export class ReporteController {

    getError(error: any) {
        const body: ResponseApi<null> = {
            data: null,
            message: error.message,
            error: true,
            status: 500,
        };
        return body;
    }

    getReporte = async (_req: Request, res: Response) => {
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

            return res.status(body.status).json(body);
        } catch (error) {
            const body = this.getError(error);

            return res.status(body.status).json(body);
        }
    }

    insertReporte = async (_req: Request, res: Response) => {
        try {
            const payload = _req.body as insertReporteDTO;

            if (!payload.titulo) {
                throw new Error("Campos requeridos incompletos");
            }

            const repository: ReporteRepository = new ReporteStorageGateway();
            const interactor = new InsertReporteInteractor(repository);

            const result = await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: result,
                message: 'el reporte ha sido registrado correctamente',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);

        } catch (error) {
            const body = this.getError(error);

            res.status(body.status).json(body);
        }
    }

    modificarReporte = async (req: Request, res: Response) => {
        try {
            const payload = req.body as modifyReporteDTO;

            if (!payload.titulo || !payload.titulo) {
                throw new Error("Campos requeridos incompletos");
            }

            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const modificarReporteInteractor = new ModificarReporteInteractor(repositorio);

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


}

const reporteController = new ReporteController();

reporteRouter.get('/reportes', reporteController.getReporte);
reporteRouter.post('/reportes', reporteController.insertReporte);
reporteRouter.put('/reportes', reporteController.modificarReporte);

export default reporteController;


    


