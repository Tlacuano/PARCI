import { ResponseApi } from '../../../../kernel/types';
import { autenticado } from '../../entities/autenticado';
import { inicioSesionDto } from '../../adapters/dtos/inicio-sesion.dto';



export interface AutenticacionRepository {
    InisioSesion(payload: inicioSesionDto): Promise<ResponseApi<autenticado>>;
}