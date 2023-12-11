import { UsuarioRepository } from "../use-cases/ports/usuario.repository";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { ConexionBD } from "../../../utils/dbconfig";
import { ModificarCuentaDTO } from "../adapters/dtos/modificar-cuenta.dto";
import { Usuario } from "../entities/usuario";
import { EliminarUsuarioDTO } from "../adapters/dtos/eliminar-usuario.dto";
import { ModificarInformacionOpinionesDTO } from "./dtos/modificar-informacion-opiniones.dto";
import { RegistrarPersonaDTO } from "../../persona/adapters/dtos/registrar-persona.dto";

export class UsuarioStorageGateway implements UsuarioRepository {

    async getUsuarios(): Promise<Usuario[]> {
        try {
            const resultado = await ConexionBD<Usuario[]>("SELECT id_usuario, usuario, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona FROM usuarios", []);
            return resultado;
        } catch (error) {
            throw error;
        }
    }


    async registrarUsuario(payload: RegistrarPersonaDTO): Promise<boolean> {
        try {
            await ConexionBD<boolean>("INSERT INTO usuarios (usuario, contraseña, rol, fk_idPersona) VALUES (?, ?, ?, ?)", [payload.usuario.usuario, payload.usuario.contrasena, payload.usuario.rol, payload.usuario.fk_idPersona]);
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
            await ConexionBD<boolean>("DELETE FROM usuarios WHERE id_usuario = (SELECT id_usuario FROM (SELECT * FROM usuarios) AS u WHERE usuario = ?)", [payload.usuario]);
            return true;
        } catch (error) {
            console.log(error);
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
            const result = await ConexionBD<any>("UPDATE usuarios SET fecha_opinion = ?, contador_opinion = contador_opinion + 1 WHERE usuario = ?", [payload.fecha_opinion, payload.usuario]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se pudo modificar la cuenta");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }


    async consultarInformacionOpiniones(payload: string): Promise<Usuario> {
        try {
            const resultado = await ConexionBD<Usuario[]>("SELECT fecha_opinion, contador_opinion FROM usuarios WHERE usuario = ?", [payload]);

            if (resultado.length === 0) {
                throw new Error("Usuario no encontrado");
            }

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    async reiniciarContadorOpiniones(payload: string): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE usuarios SET contador_opinion = 0 WHERE usuario = ?", [payload]);
            
            if (result.affectedRows === 0) {
                throw new Error("Ocurrio un error al modificar");
            }
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    async existeUsuario(usuario: string): Promise<boolean> {
        try {
            const resultado = await ConexionBD<Usuario[]>("SELECT id_usuario, usuario, rol, codigo, fecha_opinion, contador_opinion, fk_idPersona FROM usuarios WHERE usuario = ?", [usuario]);

            if (resultado.length === 0) {
                return false;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

}