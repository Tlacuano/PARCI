import { inicioSesionDto } from "../../adapters/dtos/inicio-sesion.dto";
import { registrarCodigoUsuarioDto } from "../../adapters/dtos/registrar-codigo-usuario.dto";
import { autenticado } from "../../entities/autenticado";


export interface AutenticacionRepository {
    inicioSesion(parametros: inicioSesionDto): Promise<autenticado>;

    buscarUsuario(parametros: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto>;
    registrarCodigo(parametros: registrarCodigoUsuarioDto): Promise<boolean>;

}