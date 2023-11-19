import { Request, Response, Router } from "express";
import { RequestConsultarReportesDto } from "./dto/request-consultar-reportes.dto";
import { OpinionesRepository } from "../use-cases/ports/opiniones.repository";
import { OpinionStorageGateway } from "./opinion.storage.gateway";
import { ConsultarOpinionesByReporteIdInteractor } from "../use-cases/consultar-opiniones-by-reporte-id.interactor";
import { ResponseApi } from "src/kernel/types";
import { Opinion } from "../entities/opinion";
import { validarError } from "../../../kernel/error-handler";
import { RegistrarOpinonInteractor } from "../use-cases/registrar-opinion.interactor";
import { RequestRegistrarOpinionDto } from "./dto/request-registrar-opinion.dto";

const opinionRouter = Router();

export class OpinonController {
    consultarOpinionesByReporteId = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestConsultarReportesDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const consultarOpinionesByReporteIdInteractor = new ConsultarOpinionesByReporteIdInteractor(repositorio);

            const resultado = await consultarOpinionesByReporteIdInteractor.execute(payload.fk_idReporte);

            const body: ResponseApi<Opinion[]> = {
                data: resultado,
                message: 'Opiniones consultadas correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    registrarOpinion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestRegistrarOpinionDto;

            //consultar el numero de opinones que aun puede dar el usuario en el dia


            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const registrarOpinionInteractor = new RegistrarOpinonInteractor(repositorio);

            const resultado = await registrarOpinionInteractor.execute(payload);

            //una ves registrada la opinion, se debe disminuir el numero de opinones que puede dar el usuario en el dia


            const body: ResponseApi<boolean> = {
                data: resultado,
                message: 'Opinion registrada correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }


}

const opinionController = new OpinonController();

opinionRouter.post('/consultar-opiniones', opinionController.consultarOpinionesByReporteId);
opinionRouter.post('/registrar-opinion', opinionController.registrarOpinion);

export default opinionRouter;