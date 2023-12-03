import {Request, Response, Router} from "express";
import { MunicipioRepository } from "../use-cases/ports/municipio.repository"
import { MunicipioStorageGateway } from "./municipio.gateway";
import { GetMunicipiosInteractor } from "../use-cases/get-municipios.interactor";
import { BuscaMunicipioPorNombreInteractor } from "../use-cases/buscar-municipio-por-nombre.interactor";
import { GetMunicipiosPorEntidadInteractor } from "../use-cases/get-municipios-por-entidad.interactor";
import { ResponseApi } from "../../../kernel/types";
import { Municipio } from "../entities/municipio";
import { validarError } from "../../../kernel/error-handler";
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
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
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
            res.status(errorBody.status).json(errorBody);
        }
    }

    getMunicipiosPorEntidad = async (req: Request, res: Response) => {
        try {
            const { fk_idEntidad } = req.body

            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const getMunicipiosPorEntidadInteractor = new GetMunicipiosPorEntidadInteractor(repositorio);

            const municipios = await getMunicipiosPorEntidadInteractor.execute(fk_idEntidad);

            const body: ResponseApi<Municipio[]> = {
                data: municipios,
                message: "Municipios obtenidos correctamente",
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    registrarMunicipio = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RegistrarMunicipioDTO;

            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
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

            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
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

            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
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

    buscarMunicipioPorNombre =async (req: Request, res: Response) => {
        try {
            const payload = req.body;
            
            const repositorio: MunicipioRepository = new MunicipioStorageGateway();
            const buscarMunicipioPorNombreInteractor = new BuscaMunicipioPorNombreInteractor(repositorio);

            const municipios = await buscarMunicipioPorNombreInteractor.execute(payload);

            const body: ResponseApi<Municipio[] | null> = {
                data: municipios,
                message: "Municipios obtenidas correctamente",
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


const municipiosController = new MunicipiosController();

municipiosRouter.get("/consultar", municipiosController.getMunicipios);
municipiosRouter.get("/buscar-por-nombre", municipiosController.buscarMunicipioPorNombre);
municipiosRouter.get("/consultar-por-entidad",municipiosController.getMunicipiosPorEntidad);
municipiosRouter.post("/registrar", municipiosController.registrarMunicipio)
municipiosRouter.put("/modificar", municipiosController.modificarMunicipio);
municipiosRouter.put("/cambiar-estado", municipiosController.cambiarEstadoMunicipio);

export default municipiosRouter;