import { ConexionBD } from "../../../utils/dbconfig";
import { autenticado } from "../entities/autenticado";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";
import { registrarCodigoUsuarioDto } from "./dtos/registrar-codigo-usuario.dto";
import { compararEncriptado } from "../utils/bcrypt";
import { recuperarContraseñaDto } from "./dtos/recuperar-contraseña.dto";



export class AutenticacionStorageGateway implements AutenticacionRepository {
    async inicioSesion(parametros: inicioSesionDto): Promise<autenticado> {
        try {
            const resultado = await ConexionBD<autenticado[]>('select usuario, contraseña as salt, rol, nombre_municipio as municipio from usuarios join personas on fk_idPersona = id_persona join municipios on fk_idMunicipio = id_municipio where usuario = ?',[parametros.usuario]);

            if (resultado.length === 0) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const usuario = resultado[0];

            if (!(await compararEncriptado(parametros.contraseña, usuario.salt as string))) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            usuario.salt = undefined;

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }


    async buscarUsuario(parametros: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto> {
        try {
            const resultado = await ConexionBD<registrarCodigoUsuarioDto[]>('select id_usuario, usuario, correo_electronico from usuarios join personas on fk_idPersona = id_persona where usuario = ?',[parametros.usuario]);

            if(resultado.length === 0) {
                throw new Error('Usuario no encontrado');
            }

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    async registrarCodigo(parametros: registrarCodigoUsuarioDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<registrarCodigoUsuarioDto[]>('update usuarios set codigo = ? where id_usuario = ?',[parametros.codigo, parametros.id_usuario]);

            return true;
        } catch (error) {
            throw error;
        }
    }

    async verificarCodigo(parametros: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto> {
        try {
            const resultado = await ConexionBD<registrarCodigoUsuarioDto[]>('select codigo from usuarios where usuario = ?',[parametros.usuario]);

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    async recuperarContraseña(parametros: recuperarContraseñaDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<registrarCodigoUsuarioDto[]>('update usuarios set contraseña = ? where usuario = ?',[parametros.nueva_contraseña, parametros.usuario]);

            return true;
        } catch (error) {
            throw error;
        }
    }
}

