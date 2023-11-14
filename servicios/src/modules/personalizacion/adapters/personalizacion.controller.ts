import { ConsultarPersonalizacionInteractor } from './../use-cases/consultarPersonalizacion.interactor';
import { PersonalizacionRepository } from './../use-cases/ports/personalizacion.repository';
import { Request, Response, Router } from "express";
import { validarError } from "../../../kernel/error-handler";
import { PersonalizacionStorageGateway } from './personalizacion.storage.gateway';




export class PersonalizacionController {


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
}