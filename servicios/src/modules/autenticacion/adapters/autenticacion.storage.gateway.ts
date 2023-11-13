import { ConexionBD } from "src/utils/dbconfig";
import { autenticado } from "../entities/autenticado";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";



export class AutenticacionStorageGateway implements AutenticacionRepository {
    async inicioSesion(parametros: inicioSesionDto): Promise<autenticado> {
        try {
            const resultado = await ConexionBD<autenticado[]>('',[parametros.usuario, parametros.contrasena]);

            if (resultado.length > 0) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }
}

