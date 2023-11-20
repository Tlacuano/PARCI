import { Request, Response, Router } from "express";
import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import { UsuarioStorageGateway } from "./usuario.storage.gateway";
import { ResponseApi } from "src/kernel/types";
import { Usuario } from "../entities/usuario";
import { validarError } from "../../../kernel/error-handler";
import { RegistrarUsuarioInteractor } from "../use-cases/registrar-usuario.interactor";
import { RegistrarUsuarioDTO } from "./dtos/registrar-usuario.dto";
import { encriptar } from "../../../kernel/bcrypt";
import { ModificarCuentaDTO } from "./dtos/modificar-cuenta.dto";
import { ModificarCuentaInteractor } from "../use-cases/modificar-cuenta.interactor";
import { GetUsuariosInteractor } from "../use-cases/get-usuarios.interactor";
import { EliminarUsuarioDTO } from "./dtos/eliminar-usuario.dto";
import { EliminarUsuarioInteractor } from "../use-cases/eliminar-usuario.interactor";
import { Persona } from "src/modules/persona/entities/persona";
import { PersonaRepository } from "src/modules/persona/use-cases/ports/persona.repository";
import { GetPersonasInteractor } from "src/modules/persona/use-cases/get-personas.interactor";
import { PersonaStorageGateway } from "src/modules/persona/adapters/persona.storage.gateway";
import { ModificarInformacionPersonaInteractor } from "src/modules/persona/use-cases/modificar-informacion-persona.interactor";
import { ModificarInformacionOpinionesInteractor } from "../use-cases/modificar-informacion-opiniones.interactor";

const usuarioRouter = Router();

export class UsuarioController {

    // REGISTRAR LOCAL
    static registrarUsuario_Local = async (persona: Persona) => {
        try {
            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
            const registrarUsuarioInteractor = new RegistrarUsuarioInteractor(
                repositorio
            );

            const payload = {
                usuario: new String,
                contrasena: new String,
                rol: new Number,
                codigo: new String,
                fecha_opinion: new Date(),
                contador_opinion: new Number,
                fk_idPersona: persona
            } as RegistrarUsuarioDTO;

            await registrarUsuarioInteractor.execute(payload);

            return true;
        } catch (error) {
            return error;
        }
    }


    static getInfoOpiniones_Local = async (id_persona: number) => {
        try {
            const repositorio: PersonaRepository =
                new PersonaStorageGateway();
            const getPersonasInteractor = new GetPersonasInteractor(
                repositorio
            );

            const personas = await getPersonasInteractor.execute();

            const personasFiltradas = personas.filter(persona => persona.id_persona === id_persona);

            const body: ResponseApi<Persona[]> = {
                data: personasFiltradas,
                message: "Personas consultados correctamente",
                status: 200,
                error: false,
            };

            return body;
        } catch (error) {
            return error;
        }
    }


    static actualizarInfoOpiniones_Local = async (
        id_persona: number,
        fecha_opinion: Date,
        contador_opinion: number
    ) => {
        try {
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const modificarInfoOpiniones = new ModificarInformacionOpinionesInteractor(
                repositorio
            );
    
            const usuario = await repositorio.getUsuarioById(id_persona);
    
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
    
            usuario.fecha_opinion = fecha_opinion;
            usuario.contador_opinion = contador_opinion;
    
            await repositorio.modificarInformacionOpiniones(usuario);
    
            const body: ResponseApi<Usuario[]> = {
                data: [usuario],
                message: "Información de usuario actualizada correctamente",
                status: 200,
                error: false,
            };
    
            return body;
        } catch (error) {
            return error;
        }
    };
    



    // REGISTRAR
    registrarUsuario = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RegistrarUsuarioDTO;

            payload.contrasena = await encriptar(payload.contrasena);

            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
            const registrarUsuarioInteractor = new RegistrarUsuarioInteractor(
                repositorio
            );

            await registrarUsuarioInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Usuario registrado correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    //MODIFICAR   -------------------------------------------
    modificarUsuario = async (req: Request, res: Response) => {
        try {
            const payload = req.body as ModificarCuentaDTO;

           

            payload.contrasena = await encriptar(payload.contrasena);

            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
            const modificarCuentaInteractor = new ModificarCuentaInteractor(
                repositorio
            );

            await modificarCuentaInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Usuario modificado correctamente",
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
    getUsuarios = async (req: Request, res: Response) => {
        try {
            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
                const getUsuariosInteractor = new GetUsuariosInteractor(
                    repositorio
                  );
            const usuarios = await getUsuariosInteractor.execute();

            const body: ResponseApi<Usuario[]> = {
                data: usuarios,
                message: "Usuarios consultados correctamente",
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
    eliminarUsuario = async (req: Request, res: Response) => {
        try {
            const payload = req.body as EliminarUsuarioDTO;

            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
            const eliminarUsuarioInteractor = new EliminarUsuarioInteractor(
                repositorio
            );

            await eliminarUsuarioInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Usuario eliminado correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    //CONSULTAR POR ID
    getUsuarioById = async (req: Request, res: Response) => {
        try {
            const id_usuario = Number(req.params.id_usuario);

            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const usuario = await repositorio.getUsuarioById(id_usuario);

            const body: ResponseApi<Usuario> = {
                data: usuario,
                message: "Usuario consultado correctamente",
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

const usuarioController = new UsuarioController();

usuarioRouter.post("/registrar", usuarioController.registrarUsuario);
usuarioRouter.put("/modificar", usuarioController.modificarUsuario);
usuarioRouter.get("/consultar", usuarioController.getUsuarios);
usuarioRouter.delete("/eliminar", usuarioController.eliminarUsuario);
usuarioRouter.get("/consultar/:id_usuario", usuarioController.getUsuarioById);

export default usuarioRouter;