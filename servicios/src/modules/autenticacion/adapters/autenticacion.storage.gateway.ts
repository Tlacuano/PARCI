import { ConexionBD } from "src/utils/dbconfig";
import { autenticado } from "../entities/autenticado";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";
import { registrarCodigoUsuarioDto } from "./dtos/registrar-codigo-usuario.dto";
import { compararEncriptado } from "../utils/bcrypt";



export class AutenticacionStorageGateway implements AutenticacionRepository {
    async inicioSesion(parametros: inicioSesionDto): Promise<autenticado> {
        try {
            const resultado = await ConexionBD<autenticado[]>('select usuario, contraseña as salt from usuarios where usuario = ?',[parametros.usuario]);

            if (resultado.length > 0) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const usuario = resultado[0];

            if (!(await compararEncriptado(parametros.contrasena, usuario.salt as string))) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            usuario.salt = undefined;

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }


    buscarUsuario(parametros: registrarCodigoUsuarioDto): Promise<autenticado> {
        throw new Error("Method not implemented.");
    }
}

