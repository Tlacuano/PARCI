import { ConsultarInformacionOpinionesInteractor } from './../use-cases/consultar-informacion-opiniones.interactor';
import { Request, Response, Router } from "express";
import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import { UsuarioStorageGateway } from "./usuario.storage.gateway";
import { ResponseApi } from "../../../kernel/types";
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
import { Persona } from "../../../modules/persona/entities/persona";
import { ModificarInformacionOpinionesInteractor } from "../use-cases/modificar-informacion-opiniones.interactor";
import { ReiniciarContadorOpinionesInteractor } from '../use-cases/reiniciar-contador-opiniones.interactor';
import { ModificarInformacionOpinionesDTO } from './dtos/modificar-informacion-opiniones.dto';
import { RegistrarPersonaDTO } from '../../../modules/persona/adapters/dtos/registrar-persona.dto';
import { PersonaRepository } from '../../../modules/persona/use-cases/ports/persona.repository';
import { PersonaStorageGateway } from '../../../modules/persona/adapters/persona.storage.gateway';
import { RegistrarPersonaInteractor } from '../../../modules/persona/use-cases/registrar-persona.interactor';
import { EliminarPersonaInteractor } from '../../../modules/persona/use-cases/eliminar-persona.interactor';
import { EliminarPersonaDTO } from 'src/modules/persona/adapters/dtos/eliminar-persona.dto';

const usuarioRouter = Router();

export class UsuarioController {

    // REGISTRAR LOCAL
    static registrarUsuario_Local = async (payload: Persona) => {
        try {
            const repositorioPersona: PersonaRepository = new PersonaStorageGateway();
            const registrarPersonaInteractor = new RegistrarPersonaInteractor(repositorioPersona);
    
            const persona: Persona = {
                nombre: payload.nombre,
                apellido_paterno: payload.apellido_paterno,
                apellido_materno: payload.apellido_materno,
                correo_electronico: payload.correo_electronico,
                fecha_nacimiento: payload.fecha_nacimiento,
                fk_idMunicipio: payload.fk_idMunicipio,
            };
    
            await registrarPersonaInteractor.execute(persona);
    
            const repositorioUsuario: UsuarioRepository = new UsuarioStorageGateway();
            const registrarUsuarioInteractor = new RegistrarUsuarioInteractor(repositorioUsuario);
    
            const usuarioPayload = {
                usuario: new String,
                contrasena: new String,
                rol: new Number,
                codigo: new String,
                fecha_opinion: new Date(),
                contador_opinion: new Number,
                fk_idPersona: persona
            } as RegistrarUsuarioDTO;
    
            await registrarUsuarioInteractor.execute(usuarioPayload);
    
            return true;
        } catch (error) {
            return error;
        }
    }


    static eliminarUsuarioLocal = async (id_usuario: number) => {
        try {
            const repositorioUsuario: UsuarioRepository = new UsuarioStorageGateway();
            const eliminarUsuarioInteractor = new EliminarUsuarioInteractor(repositorioUsuario);
    
            const usuario = await repositorioUsuario.getUsuarioById(id_usuario);
    
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            const eliminarUsuarioPayload = {
                id_usuario: id_usuario
            } as EliminarUsuarioDTO;

            await eliminarUsuarioInteractor.execute(eliminarUsuarioPayload);

            if (usuario.fk_idPersona !== undefined) {
                const repositorioPersona: PersonaRepository = new PersonaStorageGateway();
                const eliminarPersonaInteractor = new EliminarPersonaInteractor(repositorioPersona);

                const idPersona = usuario.fk_idPersona?.id_persona;

                const eliminarPersonaDTO: EliminarPersonaDTO = {
                    id_persona: idPersona!,
                };

                await eliminarPersonaInteractor.execute(eliminarPersonaDTO);
            }
    
            return true;
        } catch (error) {
            return error;
        }
    }
    


    static getInfoOpiniones_Local = async (payload: string) => {
        try {
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const consultarInformacionOpinionesInteractor = new ConsultarInformacionOpinionesInteractor(repositorio);
            
            const informacionOpinionUsuario = await consultarInformacionOpinionesInteractor.execute(payload);

            if (!informacionOpinionUsuario) {
                throw new Error("Usuario no encontrado");
            }

            return informacionOpinionUsuario;
        } catch (error) {
            throw error;
        }
    }

    static reiniciarContadorOpiniones_Local = async (payload: string) => {
        try {
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const reiniciarContadorOpinionesInteractor = new ReiniciarContadorOpinionesInteractor(
                repositorio
            );
            
            const resultado = await reiniciarContadorOpinionesInteractor.execute(payload);
            
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    static actualizarInfoOpiniones_Local = async (modificarInformacionOpiniones:ModificarInformacionOpinionesDTO) => {
        try {
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();

    
            const resultado = await repositorio.modificarInformacionOpiniones(modificarInformacionOpiniones);
    
            return resultado;
        } catch (error) {
            throw error;
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