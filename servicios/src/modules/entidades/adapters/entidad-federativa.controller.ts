import Response, Request, { Router } from "express";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { EntidadFederativaStorageGateway } from "./entidad-federativa.storage.gateway";
import { GetEntidadesFederativas } from './../use-cases/get-entidades-federativas.interactor';
import { ResponseApi } from "../../../kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { validarError } from "../../../kernel/error-handler";

const entidadesFederativasRouter = Router();

export class EntidadesFederativasController {
    getEntidadesFederativas = async (req: Request, res: Response) => {
        try {
            const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway;
            const GetEntidadesFederativasInteractor = new GetEntidadesFederativas(repositorio);

            const entidadesFederativas = await GetEntidadesFederativasInteractor.execute();

            const body: ResponseApi<EntidadFederativa[]> = {
                data: entidadesFederativas,
                message: 'Entidades federativas obtenidas correctamente',
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