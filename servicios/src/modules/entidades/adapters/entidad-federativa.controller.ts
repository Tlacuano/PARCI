import { Request, Response, Router } from "express";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { EntidadFederativaStorageGateway } from "./entidad-federativa.storage.gateway";
import { GetEntidadesFederativasInteractor } from "./../use-cases/get-entidades-federativas.interactor";
import { ResponseApi } from "../../../kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { validarError } from "../../../kernel/error-handler";
import { RegistrarEntidadFederativaInteractor } from "../use-cases/registrar-entidad-federativa.interactor";
import { RegistrarEntidadFederativaDTO } from "./dtos/registrar-entidad-federativa.dto";

const entidadesFederativasRouter = Router();

export class EntidadesFederativasController {
  getEntidadesFederativas = async (_req: Request, res: Response) => {
    try {
      const repositorio: EntidadFederativaRepository =
        new EntidadFederativaStorageGateway();
      const getEntidadesFederativasInteractor = new GetEntidadesFederativasInteractor(
        repositorio
      );

      const entidadesFederativas =
        await getEntidadesFederativasInteractor.execute();

      const body: ResponseApi<EntidadFederativa[]> = {
        data: entidadesFederativas,
        message: "Entidades federativas obtenidas correctamente",
        status: 200,
        error: false,
      };

      res.status(body.status).json(body);
    } catch (error) {
      const errorBody = validarError(error as Error);
      res.status(errorBody.status).json(errorBody);
    }
  };

  registrarEntidadFederativa = async (req: Request, res: Response) => {
    try {
      const payload = req.body as RegistrarEntidadFederativaDTO;

      if (payload.nombre_entidad === "") {
        throw new Error("Campos requeridos incompletos");
      }

      const repositorio: EntidadFederativaRepository =
        new EntidadFederativaStorageGateway();
      const registrarEntidadFederativaInteractor = new RegistrarEntidadFederativaInteractor(
        repositorio
      );
      
      const result = await registrarEntidadFederativaInteractor.execute(payload);

      const body: ResponseApi<boolean> = {
        data: true,
        message: "Entidad federativa registrada correctamente",
        status: 200,
        error: false,
      };

      res.status(body.status).json(body);
    } catch (error) {
      const errorBody = validarError(error as Error);
      res.status(errorBody.status).json(errorBody);
    }
  };
}

const entidadesFederativasController = new EntidadesFederativasController();

entidadesFederativasRouter.get("/entidades-federativas", entidadesFederativasController.getEntidadesFederativas);
entidadesFederativasRouter.post("/entidades-federativas", entidadesFederativasController.registrarEntidadFederativa);

export default entidadesFederativasRouter;
