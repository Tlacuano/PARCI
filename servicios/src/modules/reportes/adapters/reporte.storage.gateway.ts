import { ConexionBD } from "src/utils/dbconfig";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";

export class ReporteStorageGateway implements ReporteRepository {

    async getReporte(): Promise<Reporte[]> {
        try {
            const result = await ConexionBD<Reporte[]>('SELECT * FROM reportes', []);
            if (!result) throw new Error('No se encontraron errores');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async insertReporte(payload: insertReporteDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<boolean>(
                'INSERT INTO reportes (fecha, titulo, descripcion, imagen, votos_positivos, votos negativos,fk_idPersona, fk_idMunicipio, fk_idCategoria, estado  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [payload.fecha,payload.titulo,payload.descripcion,payload.imagen,payload.votos_positivos,payload.votos_negativos,
                payload.fk_idPersona,payload.fk_idMunicipio,payload.fk_idCategoria,payload.estado,]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarReporte(payload: modifyReporteDTO): Promise<boolean> {
        try {
            // Ajusta la consulta SQL para realizar la modificación según la lógica de tu aplicación
            await ConexionBD<boolean>("UPDATE reportes SET titulo = ? , descripcion = ? WHERE id_reporte = ? ;",
            [payload.titulo, payload.descripcion]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    //async eliminarReporte (payload:)

    
}
