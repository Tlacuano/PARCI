import { ModificarCuentaDTO } from "../../adapters/dtos/modificar-cuenta.dto";
import { RegistrarUsuarioDTO } from "../../adapters/dtos/registrar-usuario.dto";
import { Usuario } from "../../entities/usuario";
import { EliminarUsuarioDTO } from "../../adapters/dtos/eliminar-usuario.dto";
import { ModificarRolUsuarioDTO } from "../../adapters/dtos/modificar-rol-usuario.dto";

export interface UsuarioRepository {
getUsuarios(): Promise<Usuario[]>;
registrarUsuario(payload: RegistrarUsuarioDTO): Promise<boolean>;
modificarCuenta(payload: ModificarCuentaDTO): Promise<boolean>;
eliminarUsuario(payload: EliminarUsuarioDTO): Promise<boolean>;
getUsuarioById(id_usuario: number): Promise<Usuario>;
modificarRolUsuario(payload: ModificarRolUsuarioDTO): Promise<boolean>;
}