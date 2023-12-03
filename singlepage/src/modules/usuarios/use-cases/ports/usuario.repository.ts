import { ResponseApi } from "@/kernel/types";
import { Usuario } from "../../entities/usuario";
import { RegistrarUsuarioDTO } from "../../adapters/dtos/registrar-usuario.dto";
import { ModificarCuentaDTO } from "../../adapters/dtos/modificar-cuenta.dto";
import { EliminarUsuarioDTO } from "../../adapters/dtos/eliminar-usuario.dto";
import { ModificarInformacionOpinionesDTO } from "../../adapters/dtos/modificar-informacion-opiniones.dto";

export interface UsuarioRepository {
    getUsuarios(): Promise<ResponseApi<Usuario[]>>;
    registrarUsuario(payload: RegistrarUsuarioDTO): Promise<ResponseApi<boolean>>;
    modificarCuenta(payload: ModificarCuentaDTO): Promise<ResponseApi<boolean>>;
    eliminarUsuario(payload: EliminarUsuarioDTO): Promise<ResponseApi<boolean>>;
    getUsuarioById(id_usuario: number): Promise<ResponseApi<Usuario>>;
    buscarUsuarioPorNombre(payload: RegistrarUsuarioDTO): Promise<ResponseApi<Usuario[] | null>>;
    modificarInformacionOpiniones(payload: ModificarInformacionOpinionesDTO): Promise<ResponseApi<boolean>>;
    consultarInformacionOpiniones(payload: string): Promise<ResponseApi<Usuario>>;
    reiniciarContadorOpiniones(payload: string): Promise<ResponseApi<boolean>>;
    existeUsuario(usuario: string): Promise<ResponseApi<boolean>>;
}