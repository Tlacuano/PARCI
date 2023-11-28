import { ResponseApi } from '../../../kernel/types';
import { autenticado } from '../entities/autenticado';
import { AutenticacionRepository } from '../use-cases/ports/autenticacion.repository';
import { inicioSesionDto } from './dtos/inicio-sesion.dto';
import api from '../../../config/http-client.gateway';
import { registrarCodigoUsuarioDto } from './dtos/registrar-codigo-usuario.dto';
import { RecuperarContraseñaDto } from './dtos/recuperar-contraseña.dto';



export class AutenticacionStorageGateway implements AutenticacionRepository{

    async InisioSesion(payload: inicioSesionDto): Promise<ResponseApi<autenticado>> {
        const respuesta = await api.doPost('/autenticacion/inicio-sesion', payload);
        return{
            ...respuesta.data
        } as ResponseApi<autenticado>
    }

    async registrarCodigo(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost('/autenticacion/registrar-codigo', payload);
        return{
            ...respuesta.data
        } as ResponseApi<boolean>
    }

    async verificarCodigo(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost('/autenticacion/verificar-codigo', payload);
        return{
            ...respuesta.data
        } as ResponseApi<boolean>
    }

   async registrarUsuario(payload: RecuperarContraseñaDto): Promise<ResponseApi<boolean>> {
        const respuesta = await api.doPost('/autenticacion/recuperar-contrasena', payload);
        return{
            ...respuesta.data
        } as ResponseApi<boolean>
    }

}