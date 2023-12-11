import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import { UsuarioStorageGateway } from "./usuario-storage.gateway";
import { GetUsuariosInteractor } from "../use-cases/get-usuarios.interactor";
import { RegistrarUsuarioInteractor } from "../use-cases/registrar-usuario.interactor";
import { ModificarCuentaInteractor } from "../use-cases/modificar-cuenta.interactor";
import { RegistrarUsuarioDTO } from "./dtos/registrar-usuario.dto";
import { ModificarCuentaDTO } from "./dtos/modificar-cuenta.dto";
import { EliminarUsuarioDTO } from "./dtos/eliminar-usuario.dto";
import { EliminarUsuarioInteractor } from "../use-cases/eliminar-usuario.interactor";
import { ModificarInformacionOpinionesDTO } from "./dtos/modificar-informacion-opiniones.dto";
import { ModificarInformacionOpinionesInteractor } from "../use-cases/modificar-informacion-opiniones.interactor";
import { ConsultarInformacionOpinionesInteractor } from "../use-cases/consultar-informacion-opiniones.interactor";
import { InformacionOpinionesDto } from "./dtos/informacion-opiniones.dto";






export class UsuarioController{
    private obtenerError(error: any){
        return{
            status: error.status,
            error: true,
            message: error.message,
        } as ResponseApi<any>;
    }

    // CONSULTAR USUARIOS
    obtenerUsuarios = async () => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const obtenerUsuariosInteractor = new GetUsuariosInteractor(repositorio);

            const respuesta = await obtenerUsuariosInteractor.execute();

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };


    // REGISTRAR USUARIO
    registrarUsuario = async (payload: RegistrarUsuarioDTO) => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const registrarUsuarioInteractor = new RegistrarUsuarioInteractor(repositorio);

            const respuesta = await registrarUsuarioInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };


    // MODIFICAR USUARIO
    modificarUsuario = async (payload: ModificarCuentaDTO) => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const modificarUsuarioInteractor = new ModificarCuentaInteractor(repositorio);

            const respuesta = await modificarUsuarioInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    //ELIMINAR USUARIO
    eliminarUsuario = async (payload: EliminarUsuarioDTO) => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const eliminarUsuarioInteractor = new EliminarUsuarioInteractor(repositorio);

            const respuesta = await eliminarUsuarioInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    //Modificar informacion opiniones
    modificarInformacion = async (payload: ModificarInformacionOpinionesDTO) => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const modificarInformacionInteractor = new ModificarInformacionOpinionesInteractor(repositorio);

            const respuesta = await modificarInformacionInteractor.execute(payload);

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };

    //consultar informacion opiniones
    consultarInformacion = async (payload: InformacionOpinionesDto) => {
        try{
            const repositorio: UsuarioRepository = new UsuarioStorageGateway();
            const consultarInformacionInteractor = new ConsultarInformacionOpinionesInteractor(repositorio);

            const respuesta = await consultarInformacionInteractor.execute(String(payload));

            return respuesta;
        }catch(error){
            return this.obtenerError(error);
        }
    };



    
}