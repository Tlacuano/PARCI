import { ModificarCuentaDTO } from "../../adapters/dtos/modificar-cuenta.dto";
import { RegistrarUsuarioDTO } from "../../adapters/dtos/registrar-usuario.dto";
import { Usuario } from "../../entities/usuario";
import { EliminarUsuarioDTO } from "../../adapters/dtos/eliminar-usuario.dto";
import { ModificarInformacionOpinionesDTO } from "../../adapters/dtos/modificar-informacion-opiniones.dto";
import { RegistrarPersonaDTO } from "../../../persona/adapters/dtos/registrar-persona.dto";

export interface UsuarioRepository {
    getUsuarios(): Promise<Usuario[]>;
    registrarUsuario(payload: RegistrarPersonaDTO): Promise<boolean>;
    modificarCuenta(payload: ModificarCuentaDTO): Promise<boolean>;
    eliminarUsuario(payload: EliminarUsuarioDTO): Promise<boolean>;
    getUsuarioById(id_usuario: number): Promise<Usuario>;
    buscarUsuarioPorNombre(payload: RegistrarUsuarioDTO): Promise<Usuario[] | null>;
    modificarInformacionOpiniones(payload: ModificarInformacionOpinionesDTO): Promise<boolean>;
    consultarInformacionOpiniones(payload: string): Promise<Usuario>;
    reiniciarContadorOpiniones(payload: string): Promise<boolean>;
    existeUsuario(usuario: string): Promise<boolean>;
}