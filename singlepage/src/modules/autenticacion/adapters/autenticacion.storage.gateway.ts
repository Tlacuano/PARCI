import { ResponseApi } from '../../../kernel/types';
import { autenticado } from '../entities/autenticado';
import { AutenticacionRepository } from '../use-cases/ports/autenticacion.repository';
import { inicioSesionDto } from './dtos/inicio-sesion.dto';
import api from '../../../config/http-client.gateway';



export class AutenticacionStorageGateway implements AutenticacionRepository{

    async InisioSesion(payload: inicioSesionDto): Promise<ResponseApi<autenticado>> {
        const respuesta = await api.doPost('/autenticacion/inicio-sesion', payload);
        return{
            ...respuesta.data
        } as ResponseApi<autenticado>
    }

}