import { inicioSesionDto } from "../../adapters/dtos/inicio-sesion.dto";
import { autenticado } from "../../entities/autenticado";


export interface AutenticacionRepository {
    inicioSesion(parametros: inicioSesionDto): Promise<autenticado>;
}