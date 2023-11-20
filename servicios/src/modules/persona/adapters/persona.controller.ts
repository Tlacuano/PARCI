import { Request, Response, Router } from "express";
import { validarError } from "../../../kernel/error-handler";
import { ResponseApi } from "../../../kernel/types";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "../use-cases/ports/persona.repository";
import { PersonaStorageGateway } from "./persona.storage.gateway";
import { RegistrarPersonaInteractor } from "../use-cases/registrar-persona.interactor";
import { GetPersonasInteractor } from "../use-cases/get-personas.interactor";
import { ModificarInformacionPersonaInteractor } from "../use-cases/modificar-informacion-persona.interactor";
import { EliminarPersonaInteractor } from "../use-cases/eliminar-persona.interactor";
import { EliminarPersonaDTO } from "./dtos/eliminar-persona.dto";
import { ModificarInformacionPersonaDTO } from "./dtos/modificar-informacion-persona.dto";
import { RegistrarPersonaDTO } from "./dtos/registrar-persona.dto";
import { usuariosBoundary } from "../../../modules/usuarios/adapters/usuario.boundary";

const personaRouter = Router();

export class PersonaController {

     // REGISTRAR
     registrarPersona = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RegistrarPersonaDTO;

            const repositorio: PersonaRepository =
                new PersonaStorageGateway();
            const registrarPersonaInteractor = new RegistrarPersonaInteractor(
                repositorio
            );

            const persona: Persona = {
                id_persona: 0,
                nombre: payload.nombre,
                apellido_paterno: payload.apellido_paterno,
                apellido_materno: payload.apellido_materno,
                correo_electronico: payload.correo_electronico,
                fecha_nacimiento: payload.fecha_nacimiento,
                fk_idMunicipio: payload.fk_idMunicipio,
            };

            await usuariosBoundary.registrarUsuario_Local(persona);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Persona registrada correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };
    //MODIFICAR
    modificarInformacionPersona = async (req: Request, res: Response) => {
        try {
            const payload = req.body as ModificarInformacionPersonaDTO;

            const repositorio: PersonaRepository =
                new PersonaStorageGateway();
            const modificarInformacionPersonaInteractor = new ModificarInformacionPersonaInteractor(
                repositorio
            );

            await modificarInformacionPersonaInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Persona modificada correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    //ELIMINAR
    eliminarPersona = async (req: Request, res: Response) => {
        try {
            const payload = req.body as EliminarPersonaDTO;

            const repositorio: PersonaRepository =
                new PersonaStorageGateway();
            const eliminarPersonaInteractor = new EliminarPersonaInteractor(
                repositorio
            );

            await eliminarPersonaInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Persona eliminada correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    //CONSULTAR
    getPersonas = async (req: Request, res: Response) => {
        try {
            const repositorio: PersonaRepository =
                new PersonaStorageGateway();
                const getPersonasInteractor = new GetPersonasInteractor(
                    repositorio
                  );
            const personas = await getPersonasInteractor.execute();

            const body: ResponseApi<Persona[]> = {
                data: personas,
                message: "Personas consultadas correctamente",
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

const personaController = new PersonaController();

personaRouter.post("/registrar", personaController.registrarPersona);
export default personaController;