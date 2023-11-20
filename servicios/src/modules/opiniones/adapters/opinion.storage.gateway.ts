import { ConexionBD } from './../../../utils/dbconfig';
import { Opinion } from "../entities/opinion";
import { RequestRegistrarOpinionDto } from './dto/request-registrar-opinion.dto';
import { OpinionesRepository } from '../use-cases/ports/opiniones.Repository';
import { RequestEliminarOpinionDto } from './dto/request-eliminar-opinion.dto';
import { RequestModificarOpinionDto } from './dto/request-modificar-opinion.dto';




export class OpinionStorageGateway implements OpinionesRepository{
    async consultarOpinionesByReporteId(payload: number): Promise<Opinion[]> {
        try {
            const resultado = await ConexionBD<Opinion[]>(`SELECT
                                                                o.id_opinion,
                                                                o.fecha,
                                                                o.opinion,
                                                                o.votos_positivos,
                                                                o.votos_negativos,
                                                                o.fk_idReporte,
                                                                CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre_completo_persona,
                                                                o.fk_idPersona
                                                            FROM
                                                                opiniones o
                                                            JOIN
                                                                personas p ON o.fk_idPersona = p.id_persona
                                                            WHERE fk_idReporte = ?`, [payload]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async registrarOpinion(payload: RequestRegistrarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`INSERT INTO opiniones (fecha, opinion, votos_positivos, votos_negativos, fk_idReporte, fk_idPersona) VALUES (?, ?, 0, 0, ?, (SELECT id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?))`, [payload.fecha, payload.opinion, payload.fk_idReporte, payload.usuario]);

            if (resultado.insertId === 0) {
                throw new Error('No se pudo registrar la opinion');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async eliminarOpinion(payload: RequestEliminarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`DELETE FROM opiniones WHERE id_opinion = ?`, [payload.id_opinion]);

            if (resultado.affectedRows === 0) {
                throw new Error('No se pudo eliminar la opinion');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarOpinion(payload: RequestModificarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`UPDATE opiniones SET opinion = ? WHERE id_opinion = ?`, [payload.opinion, payload.id_opinion]);

            if (resultado.affectedRows === 0) {
                throw new Error('Ocurrio un error al modificar');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }


    async aumentarVotoPositivo(payload: number): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`UPDATE opiniones SET votos_positivos = votos_positivos + 1 WHERE id_opinion = ?`, [payload]);

            if (resultado.affectedRows === 0) {
                throw new Error('Ocurrio un error al modificar');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async aumentarVotoNegativo(payload: number): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`UPDATE opiniones SET votos_negativos = votos_negativos + 1 WHERE id_opinion = ?`, [payload]);

            if (resultado.affectedRows === 0) {
                throw new Error('Ocurrio un error al modificar');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }


}