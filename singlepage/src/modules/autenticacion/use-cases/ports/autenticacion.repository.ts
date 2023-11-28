import { ResponseApi } from '../../../../kernel/types';
import { autenticado } from '../../entities/autenticado';
import { inicioSesionDto } from '../../adapters/dtos/inicio-sesion.dto';
import { registrarCodigoUsuarioDto } from '../../adapters/dtos/registrar-codigo-usuario.dto';
import { RecuperarContraseñaDto } from '../../adapters/dtos/recuperar-contraseña.dto';



export interface AutenticacionRepository {
    InisioSesion(payload: inicioSesionDto): Promise<ResponseApi<autenticado>>;
    registrarCodigo(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>>;
    verificarCodigo(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>>;
    registrarUsuario(payload: RecuperarContraseñaDto): Promise<ResponseApi<boolean>>;
}