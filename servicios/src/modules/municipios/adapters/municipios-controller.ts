import {Request, Response, Router} from "express";
import { MunicipioRepository } from "../use-cases/ports/municipio.repository"
import { MunicipiosStorageGateway } from "./municipios.gateway";
import { GetMunicipiosInteractor } from "../use-cases/get-municipios.interactor";
import { ResponseApi } from "src/kernel/types";
import { Municipio } from "../entities/municipios";
import { validarError } from "src/kernel/error-handler";
import { RegistrarMunicipioInteractor } from "../use-cases/registrar-municipio.interactor";
import { RegistrarMunicipioDTO } from "./dtos/registrar-municipio.dto";
import { ModificarMunicipioDTO } from "./dtos/modificar-municipio.dto";
import { ModificarMunicipioInteractor } from "../use-cases/modificar-municipio";
import { CambiarEstadoMunicipioDTO } from "./dtos/cambiar-estado-municipio.dto";
import { CambiarEstadoMunicipioInteractor } from "../use-cases/cambiar-estado-municipio";

const municipiosRouter = Router();

export class MunicipiosController {
    getMunicipios = async (_req: Request, res: Response) => {
        try {
            const repositorio: MunicipioRepository = new MunicipiosStorageGateway();
            const getMunicipiosInteractor = new GetMunicipiosInteractor(repositorio);

            const municipios = await getMunicipiosInteractor.execute();

            const body: ResponseApi<Municipio[]> = {
                data: municipios,
                message: "Municipios obtenidos correctamente",
                status: 200,
                error: false
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody)
        }
    }

    registrarMunicipio = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RegistrarMunicipioDTO;

            if (!payload.nombre_municipio || !payload.fk_idEntidad) {
                throw new Error("Campos requeridos incompletos");
            }

            const repositorio: MunicipioRepository = new MunicipiosStorageGateway();
            const registrarMunicipioInteractor = new RegistrarMunicipioInteractor(repositorio);

            await registrarMunicipioInteractor.execute(payload)

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Municipio registrado correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body)
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody)
        }
    };

    modificarMunicipio = async (req: Request, res: Response) => {
        try {
            const payload = req.body as ModificarMunicipioDTO;

            if(!payload.nombre_municipio || !payload.fk_idEntidad || !payload.id_municipio) {
                throw new Error("Campos requeridos incompletos");
            }

            const repositorio: MunicipioRepository = new MunicipiosStorageGateway();
            const modificarMunicipioInteractor = new ModificarMunicipioInteractor(repositorio);

            await modificarMunicipioInteractor.execute(payload)

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Municipio modificado correctamente",
                status: 200,
                error: false
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    cambiarEstadoMunicipio = async (req: Request, res: Response) => {
        try {
            const payload = req.body as CambiarEstadoMunicipioDTO;

            if (!payload.id_municipio) {
                throw new Error("Campos requeridos incompletos")
            }

            if (payload.estado !== 0 && payload.estado !== 1) {
                throw new Error("Estado invalido");
            }

            const repositorio: MunicipioRepository = new MunicipiosStorageGateway();
            const cambiarEstaadoMunicipioInteractor = new CambiarEstadoMunicipioInteractor(repositorio);

            await cambiarEstaadoMunicipioInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: `Municipio ${payload.estado === 1 ? 'activada' : 'desactivada'} correctamente`,
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


const municipiosController = new MunicipiosController();

municipiosRouter.get("/municipios", municipiosController.getMunicipios);
municipiosRouter.post("municipios", municipiosController.registrarMunicipio)
municipiosRouter.put("/municipios", municipiosController.modificarMunicipio);
municipiosRouter.put("/municipios/estado", municipiosController.cambiarEstadoMunicipio);

export default municipiosRouter;