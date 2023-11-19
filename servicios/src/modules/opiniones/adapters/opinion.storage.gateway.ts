import { ConexionBD } from './../../../utils/dbconfig';
import { Opinion } from "../entities/opinion";
import { OpinionesRepository } from '../use-cases/ports/opiniones.repository';
import { RequestRegistrarOpinionDto } from './dto/request-registrar-opinion.dto';




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
            const resultado = await ConexionBD<any>(`INSERT INTO opiniones (fecha, opinion, votos_positivos, votos_negativos, fk_idReporte, fk_idPersona) VALUES (?, ?, 0, 0, ?, ?)`, [payload.fecha, payload.opinion, payload.fk_idReporte, payload.fk_idPersona]);

            if (resultado.insertId === 0) {
                throw new Error('No se pudo registrar la opinion');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async eliminarOpinion(payload: number): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`DELETE FROM opiniones WHERE id_opinion = ?`, [payload]);

            if (resultado.affectedRows === 0) {
                throw new Error('No se pudo eliminar la opinion');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async actualizarOpinion(payload: Opinion): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`UPDATE opiniones SET opinion = ? WHERE id_opinion = ?`, [payload.opinion, payload.id_opinion]);

            if (resultado.affectedRows === 0) {
                throw new Error('No se pudo modificar la opinion');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }



    aumentarVotoPositivo(payload: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    aumentarVotoNegativo(payload: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    consultarVotosPositivosActuales(payload: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
    consultarVotosNegativosActuales(payload: number): Promise<number> {
        throw new Error('Method not implemented.');
    }

}