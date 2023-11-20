import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { ConexionBD } from "../../../utils/dbconfig";
import { ModificarCuentaDTO } from "../adapters/dtos/modificar-cuenta.dto";
import { Usuario } from "../entities/usuario";
import { EliminarUsuarioDTO } from "../adapters/dtos/eliminar-usuario.dto";
import { ModificarInformacionOpinionesDTO } from "./dtos/modificar-informacion-opiniones.dto";

export class UsuarioStorageGateway
implements UsuarioRepository {

    async getUsuarios(): Promise<Usuario[]> {
        try {
            const resultado = await ConexionBD<Usuario[]>("SELECT id_usuario, usuario, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona FROM usuarios", []);
            return resultado;
        } catch (error) {
            throw error;
        }
    }


    async registrarUsuario(payload: RegistrarUsuarioDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("INSERT INTO usuarios (usuario, contraseña, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona) VALUES (?, ?, 3, ?, ?, ?, ?)", [payload.usuario, payload.contrasena, payload.rol, payload.codigo, payload.fecha_opinion, payload.contador_opinion, payload.fk_idPersona]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarCuenta(payload: ModificarCuentaDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?", [payload.contrasena, payload.id_usuario]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se pudo modificar la cuenta");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    async eliminarUsuario(payload: EliminarUsuarioDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("DELETE FROM usuarios WHERE id_usuario = ?", [payload.id_usuario]);
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    async getUsuarioById(id_usuario: number): Promise<Usuario> {
        try {
            const [resultado] = await ConexionBD<Usuario[]>("SELECT id_usuario, usuario, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona FROM usuarios WHERE id_usuario = ?", [id_usuario]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async buscarUsuarioPorNombre(payload: RegistrarUsuarioDTO): Promise<Usuario[] | null> {
        try {
            const resultado = await ConexionBD<Usuario[]>("SELECT id_usuario, usuario, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona FROM usuarios WHERE usuario LIKE ?", [`%${payload.usuario}%`]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async modificarInformacionOpiniones(payload: ModificarInformacionOpinionesDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE usuarios SET fecha_opinion = ?, contador_opinion = ? WHERE id_usuario = ?", [payload.fecha_opinion, payload.contador_opinion, payload.id_usuario]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se pudo modificar la cuenta");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }


}