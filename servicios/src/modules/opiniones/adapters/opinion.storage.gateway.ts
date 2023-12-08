import { ConexionBD } from './../../../utils/dbconfig';
import { Opinion } from "../entities/opinion";
import { RequestRegistrarOpinionDto } from './dto/request-registrar-opinion.dto';
import { OpinionesRepository } from '../use-cases/ports/opiniones.Repository';
import { RequestEliminarOpinionDto } from './dto/request-eliminar-opinion.dto';
import { RequestModificarOpinionDto } from './dto/request-modificar-opinion.dto';
import { RequestConsultarReportesDto } from './dto/request-consultar-reportes.dto';
import { ResponseVotoOpinionDto } from './dto/response-consultar-voto-usuario-opinioin.dto';
import { VotarOpinionDto } from './dto/request-votar-opinion.dto';




export class OpinionStorageGateway implements OpinionesRepository{


    async consultarOpinionesByReporteId(payload: RequestConsultarReportesDto): Promise<Opinion[]> {
        try {
            const resultado = await ConexionBD<Opinion[]>(`SELECT o.id_opinion, DATE_FORMAT(o.fecha, '%Y-%m-%d') as fecha, o.opinion, o.fk_idReporte, u.usuario, COUNT(CASE WHEN vo.voto = 'positivo' THEN 1 END) AS votos_positivos, COUNT(CASE WHEN vo.voto = 'negativo' THEN 1 END) AS votos_negativos, CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre_completo_persona, MAX((SELECT vo_inner.voto FROM votos_opinion vo_inner JOIN personas p_inner ON vo_inner.fk_idPersona = p_inner.id_persona JOIN usuarios u_inner ON p_inner.id_persona = u_inner.fk_idPersona WHERE vo_inner.fk_idOpinion = o.id_opinion AND u_inner.usuario = ? LIMIT 1)) AS voto_usuario FROM opiniones o JOIN personas p ON o.fk_idPersona = p.id_persona JOIN usuarios u ON p.id_persona = u.fk_idPersona LEFT JOIN votos_opinion vo ON vo.fk_idOpinion = o.id_opinion WHERE fk_idReporte = ? group by o.id_opinion, o.fecha, o.opinion, o.fk_idReporte, u.usuario ORDER BY votos_positivos DESC;`, [payload.usuario, payload.fk_idReporte]);
            
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async registrarOpinion(payload: RequestRegistrarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`INSERT INTO opiniones (fecha, opinion, fk_idReporte, fk_idPersona) VALUES (?, ?, ?, (SELECT id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?))`, [payload.fecha, payload.opinion, payload.fk_idReporte, payload.usuario]);

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

    async consultarVotoOpinion(payload: VotarOpinionDto): Promise<ResponseVotoOpinionDto> {
        try {
            const result = await ConexionBD<ResponseVotoOpinionDto[]>(`SELECT vo.voto as voto_usuario from votos_opinion vo join opiniones o on o.id_opinion = vo.fk_idOpinion where vo.fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?) AND vo.fk_idOpinion = ?`, [payload.usuario, payload.id_opinion]);
            
            return result[0]
        } catch (error) {
            throw error;
        }
    }

    async modificarVotoOpinion(payload: VotarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`UPDATE votos_opinion SET voto = ? WHERE fk_idOpinion = ? AND fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?)`, [payload.voto, payload.id_opinion, payload.usuario]);
        
            if (resultado.affectedRows === 0) {
                throw new Error('Server error');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async registrarVotoOpinion(payload: VotarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`INSERT INTO votos_opinion (voto, fk_idOpinion, fk_idPersona) VALUES (?, ?, (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?))`, [payload.voto, payload.id_opinion, payload.usuario]);
        
            if (resultado.affectedRows === 0) {
                throw new Error('Server error');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async  eliminarVotoOpinion(payload: VotarOpinionDto): Promise<boolean> {
        try {
            const resultado = await ConexionBD<any>(`DELETE FROM votos_opinion WHERE fk_idOpinion = ? AND fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?)`, [payload.id_opinion, payload.usuario]);
        
            if (resultado.affectedRows === 0) {
                throw new Error('Server error');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

}   