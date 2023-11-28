import { VerificarCodigoInteractor } from './../use-cases/verificar-codigo.interactor';
import { ResponseApi } from "../../../kernel/types";
import { InicioSesionInteractor } from "../use-cases/inicio-sesion.interactor";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { RegistrarCodigoInteractor } from "../use-cases/registrar-codigo.interactor";
import { AutenticacionStorageGateway } from "./autenticacion.storage.gateway";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";
import { registrarCodigoUsuarioDto } from "./dtos/registrar-codigo-usuario.dto";
import { RecuperarContraseñaDto } from './dtos/recuperar-contraseña.dto';
import { RecuperarContraseñaInteractor } from '../use-cases/recuperar-contraseña.interactor';



export class AutenticacionController {
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message
        } as ResponseApi<any>
    }

    inisioSesion = async (payload:inicioSesionDto) => {
        try {
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway();
            const inisioSesionInteractor = new InicioSesionInteractor(repositorio);
            const respuesta = await inisioSesionInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    registrarCodigo = async (payload: registrarCodigoUsuarioDto) => {
        try {
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway();
            const registrarcodigoInteractor = new RegistrarCodigoInteractor(repositorio);

            const respuesta = await registrarcodigoInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    verificarCodigo = async (payload: registrarCodigoUsuarioDto) => {
        try {
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway();
            const verificarCodigoInteractor = new VerificarCodigoInteractor(repositorio);

            const respuesta = await verificarCodigoInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

    recuperarContraseña = async (payload: RecuperarContraseñaDto) => {
        try {
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway();
            const recuperarContraseñaInteractor = new RecuperarContraseñaInteractor(repositorio);

            const respuesta = await recuperarContraseñaInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }


}