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
import { ModificarCuentaPersonaDTO } from "./dtos/modificar-persona.dto";
import { ModificarPersonaInteractor } from "../use-cases/modificar-persona.interactor";

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


            const registroResultado = await registrarPersonaInteractor.execute(payload);

            payload.id_persona = registroResultado;
            await usuariosBoundary.registrarUsuario_Local(payload);

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

    modificarPersona = async (req: Request, res: Response) => {
        try {
          const payload = req.body as ModificarCuentaPersonaDTO;
    
          const repositorio: PersonaRepository = new PersonaStorageGateway();
          const modificarPersonaInteractor = new ModificarPersonaInteractor(
            repositorio
          );
    
          await modificarPersonaInteractor.execute(payload);
    
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

      getPersonaInfoByUsuario = async (req: Request, res: Response) => {
        try {
          const usuario = req.body;
    
          const repositorio: PersonaRepository = new PersonaStorageGateway();
          const persona = await repositorio.getPersonaInfoByUsuario(usuario);
    
          const body: ResponseApi<Persona> = {
            data: persona,
            message: "Persona consultada correctamente",
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

const personaController = new PersonaController();

personaRouter.post("/registrar", personaController.registrarPersona);
personaRouter.post("/modificar", personaController.modificarPersona);
personaRouter.post("/consultar:usuario", personaController.getPersonaInfoByUsuario);

export default personaRouter;