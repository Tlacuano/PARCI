import { ConsultarPersonalizacionInteractor } from '../use-cases/consultar-personalizacion.interactor';
import { PersonalizacionRepository } from './../use-cases/ports/personalizacion.repository';
import { Request, Response, Router } from "express";
import { validarError } from "../../../kernel/error-handler";
import { PersonalizacionStorageGateway } from './personalizacion.storage.gateway';
import { Personalizacion } from '../entities/personalizacion';
import { ModificarPersonalizacionInteractor } from '../use-cases/modificar-personalizacion.interactor';
import { RegistrarPersonalizacionInteractor } from '../use-cases/registrar-personalizacion.interactor';


const personalizacionRouter = Router();

export class PersonalizacionController {
    static registrarPersonalizacionPorDefecto_Local = async (usuario:string) => {
        try {
            const personalizacionRepository:PersonalizacionRepository = new PersonalizacionStorageGateway();
            const registrarPersonalizacionInteractor = new RegistrarPersonalizacionInteractor(personalizacionRepository);

            const respuesta = await registrarPersonalizacionInteractor.execute(usuario) as boolean;

            return respuesta;
        } catch (error) {
            return error;
        }
    }

    static consultarPersonalizacion_Local = async (usuario:string) => {
        try {
            const personalizacionRepository:PersonalizacionRepository = new PersonalizacionStorageGateway();
            const consultarPersonalizacionInteractor = new ConsultarPersonalizacionInteractor(personalizacionRepository);

            const personalizacion = await consultarPersonalizacionInteractor.execute(usuario);

            return personalizacion;
        } catch (error) {
            return error;
        }
    }

    consultarPesonalizacion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as Personalizacion;

            const personalizacionRepository:PersonalizacionRepository = new PersonalizacionStorageGateway();
            const consultarPersonalizacionInteractor = new ConsultarPersonalizacionInteractor(personalizacionRepository);

            const personalizacion = await consultarPersonalizacionInteractor.execute(payload.usuario as string);

            const body = {
                data: personalizacion,
                message: 'Personalizacion consultada correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    modificarPersonalizacion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as Personalizacion;
            
            //actualizar con el usuario
            const personalizacionRepository:PersonalizacionRepository = new PersonalizacionStorageGateway();
            const modificarPersonalizacion = new ModificarPersonalizacionInteractor(personalizacionRepository);

            const resultado = await modificarPersonalizacion.execute(payload);

            if(!resultado) {
                throw new Error('No se pudo modificar la personalizacion');
            }
            
            //consultar lanueva personalizacion para devolverla
            const consultarPersonalizacionInteractor = new ConsultarPersonalizacionInteractor(personalizacionRepository);

            const personalizacion = await consultarPersonalizacionInteractor.execute(payload.usuario as string);

            const body = {
                data: personalizacion,
                message: 'Personalizacion modificada correctamente',
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

const personalizacionController = new PersonalizacionController();

personalizacionRouter.post('/consultar', personalizacionController.consultarPesonalizacion);
personalizacionRouter.post('/modificar', personalizacionController.modificarPersonalizacion);

export default personalizacionRouter;