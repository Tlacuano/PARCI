import { Request, Response, Router } from "express";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { EntidadFederativaStorageGateway } from "./entidad-federativa.storage.gateway";
import { GetEntidadesFederativasInteractor } from "./../use-cases/get-entidades-federativas.interactor";
import { ResponseApi } from "../../../kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { validarError } from "../../../kernel/error-handler";
import { RegistrarEntidadFederativaInteractor } from "../use-cases/registrar-entidad-federativa.interactor";
import { RegistrarEntidadFederativaDTO } from "./dtos/registrar-entidad-federativa.dto";
import { ModificarEntidadFederativaDTO } from "./dtos/modificar-entidad-federativa.dto";
import { ModificarEntidadFederativaInteractor } from "../use-cases/modificar-entidad-federativa";
import { CambiarEstadoEntidadFederativaDTO } from "./dtos/cambiar-estado-entidad-federativa.dto";
import { CambiarEstadoEntidadFederativaInteractor } from "./../use-cases/cambiar-estado-entidad-federativa";
import { BuscarEntidadPorNombreInteractor } from "./../use-cases/buscar-entidad-por-nombre.interactor";

const entidadesFederativasRouter = Router();

export class EntidadesFederativasController {
  // CONSULTAR
  getEntidadesFederativas = async (_req: Request, res: Response) => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const getEntidadesFederativasInteractor = new GetEntidadesFederativasInteractor(repositorio);

      const entidadesFederativas = await getEntidadesFederativasInteractor.execute();

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

  // REGISTRAR
  registrarEntidadFederativa = async (req: Request, res: Response) => {
    try {
      const payload = req.body as RegistrarEntidadFederativaDTO;

      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const registrarEntidadFederativaInteractor = new RegistrarEntidadFederativaInteractor(repositorio);

      await registrarEntidadFederativaInteractor.execute(payload);

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

  // MODIFICAR
  modificarEntidadFederativa = async (req: Request, res: Response) => {
    try {
      const payload = req.body as ModificarEntidadFederativaDTO;

      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const modificarEntidadFederativaInteractor = new ModificarEntidadFederativaInteractor(repositorio);

      await modificarEntidadFederativaInteractor.execute(payload);

      const body: ResponseApi<boolean> = {
        data: true,
        message: "Entidad federativa modificada correctamente",
        status: 200,
        error: false,
      };

      res.status(body.status).json(body);
    } catch (error) {
      const errorBody = validarError(error as Error);
      res.status(errorBody.status).json(errorBody);
    }
  };

  // CAMBIAR ESTADO
  cambiarEstadoEntidadFederativa = async (req: Request, res: Response) => {
    try {
      const payload = req.body as CambiarEstadoEntidadFederativaDTO;

      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const cambiarEstadoEntidadFederativaInteractor = new CambiarEstadoEntidadFederativaInteractor(repositorio);

      await cambiarEstadoEntidadFederativaInteractor.execute(payload);

      const body: ResponseApi<boolean> = {
        data: true,
        message: `Entidad federativa ${payload.estado === 1 ? "activada" : "desactivada"} correctamente`,
        status: 200,
        error: false,
      };

      res.status(body.status).json(body);
    } catch (error) {
      const errorBody = validarError(error as Error);
      res.status(errorBody.status).json(errorBody);
    }
  };

  // BUSCAR POR NOMBRE
  buscarEntidadPorNombre = async (req: Request, res: Response) => {
    try {
      const payload = req.body as RegistrarEntidadFederativaDTO;

      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const buscarEntidadPorNombreInteractor = new BuscarEntidadPorNombreInteractor(repositorio);

      const entidadesFederativas = await buscarEntidadPorNombreInteractor.execute(payload);

      const body: ResponseApi<EntidadFederativa[] | null> = {
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
}

const entidadesFederativasController = new EntidadesFederativasController();

entidadesFederativasRouter.get("/consultar", entidadesFederativasController.getEntidadesFederativas);
entidadesFederativasRouter.post("/registrar", entidadesFederativasController.registrarEntidadFederativa);
entidadesFederativasRouter.put("/modificar", entidadesFederativasController.modificarEntidadFederativa);
entidadesFederativasRouter.put("/cambiar-estado", entidadesFederativasController.cambiarEstadoEntidadFederativa);
entidadesFederativasRouter.post("/buscar-nombre", entidadesFederativasController.buscarEntidadPorNombre);

export default entidadesFederativasRouter;
