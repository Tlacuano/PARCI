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
import { ModificarRolUsuarioDTO } from "./dtos/modificar-rol-usuario.dto";
import { ModificarRolUsuarioInteractor } from "../use-cases/modificar-rol-usuario.interactor";

const usuariosRouter = Router();

export class UsuariosController {

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

    //MODIFICAR ROL
    modificarRolUsuario = async (req: Request, res: Response) => {
        try {
            const payload = req.body as ModificarRolUsuarioDTO;

            const repositorio: UsuarioRepository =
                new UsuarioStorageGateway();
            const modificarCuentaInteractor = new ModificarRolUsuarioInteractor(
                repositorio
            );

            await modificarCuentaInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Rol modificado correctamente",
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

const usuariosController = new UsuariosController();

usuariosRouter.post("/registrar", usuariosController.registrarUsuario);
usuariosRouter.put("/modificar", usuariosController.modificarUsuario);
usuariosRouter.get("/consultar", usuariosController.getUsuarios);
usuariosRouter.delete("/eliminar", usuariosController.eliminarUsuario);
usuariosRouter.get("/consultar/:id_usuario", usuariosController.getUsuarioById);
usuariosRouter.put("/modificar-rol", usuariosController.modificarRolUsuario);

export default usuariosRouter;