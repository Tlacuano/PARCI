import { InicioSesionInteractor } from './../use-cases/inicio-sesion.interactor';
import { Request, Response, Router } from "express";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { AutenticacionStorageGateway } from "./autenticacion.storage.gateway";
import { ResponseApi } from 'src/kernel/types';
import { autenticado } from '../entities/autenticado';
import { validarError } from 'src/kernel/error-handler';
import { registrarCodigoUsuarioDto } from './dtos/registrar-codigo-usuario.dto';


const autenticacionRouter = Router();

export class AutenticacionController {

    inicioSesion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as inicioSesionDto;

            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway;
            const inicioSesionInteractor = new InicioSesionInteractor(repositorio);

            const autenticado = await inicioSesionInteractor.execute(payload);

            const body: ResponseApi<autenticado> = {
                data: autenticado,
                message: 'Inicio de sesión exitoso',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);

        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    //RECUPERACION DE CONTRASEÑA = RC
    registrarCodigoRC = async (req: Request, res: Response) => {
        try {
            const payload = req.body as registrarCodigoUsuarioDto;


            
        } catch (error) {
            
        }
    }
}