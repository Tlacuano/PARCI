import { ConexionBD } from "../../../utils/dbconfig";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { modificarEstadoReporteDTO } from "./dtos/modificar-estado-reporte.dto";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";

export class ReporteStorageGateway implements ReporteRepository {

    async getReporte(obtenerReporteDTO: ObtenerReporteDTO): Promise<ObtenerReportesDTO[]>{
        try{
            let queryPart1 =   `SELECT
                                    r.id_reporte,
                                    r.titulo,
                                    r.imagen,
                                    DATE_FORMAT(r.fecha, '%Y-%m-%d') as fecha,
                                    p.nombre,
                                    p.apellido_paterno,
                                    p.apellido_materno,
                                    c.nombre_categoria,
                                    c.color,
                                    COUNT(CASE WHEN vr.voto = 'positivo' THEN 1 END) AS votos_positivos,
                                    COUNT(CASE WHEN vr.voto = 'negativo' THEN 1 END) AS votos_negativos,
                                    MAX((SELECT vr_inner.voto
                                        FROM votos_reporte vr_inner 
                                        JOIN personas p_inner ON vr_inner.fk_idPersona = p_inner.id_persona
                                        JOIN usuarios u_inner ON p_inner.id_persona = u_inner.fk_idPersona
                                        WHERE vr_inner.fk_idReporte = r.id_reporte
                                        AND u_inner.usuario = ?
                                        LIMIT 1)) AS voto_usuario
                                FROM
                                    reportes r
                                JOIN personas p ON r.fk_idPersona = p.id_persona
                                JOIN categorias c ON r.fk_idCategoria = c.id_categoria
                                JOIN municipios m ON r.fk_idMunicipio = m.id_municipio
                                LEFT JOIN votos_reporte vr ON r.id_reporte = vr.fk_idReporte
                                LEFT JOIN usuarios u ON u.fk_idPersona = p.id_persona
                                WHERE
                                    r.estado = 'Publicado'
                                    AND u.usuario = ?
                                    AND m.id_municipio = ?
                            `;
            
            if(obtenerReporteDTO?.fecha){
                queryPart1 += ' AND r.fecha = ?';
            } else if (obtenerReporteDTO?.fk_idCategoria){
                queryPart1 += ' AND r.fk_idCategoria = ?';
            }

            const query = queryPart1 + `GROUP BY
            r.id_reporte,
            r.titulo,
            r.imagen,
            r.fecha,
            p.nombre,
            p.apellido_paterno,
            p.apellido_materno,
            c.nombre_categoria,
            c.color;`;

            const result = await ConexionBD<ObtenerReportesDTO[]>(query, [obtenerReporteDTO.usuario, obtenerReporteDTO.usuario, obtenerReporteDTO.fk_idMunicipio, obtenerReporteDTO.fecha || obtenerReporteDTO.fk_idCategoria]);
            if(result.length === 0){
                console.log("no hay nadaaa")
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async obtenerReportesEnEspera(): Promise<Reporte[]> {
        try {
            const resultado = await ConexionBD<Reporte[]>('SELECT r.fecha, r.descripcion, m.nombre_municipio as nombre_municipio, ef.nombre_entidad FROM reportes r JOIN municipios m ON r.fk_idMunicipio = m.id_municipio JOIN entidades_federativas ef ON m.fk_idEntidad = ef.id_entidad WHERE r.estado = "Espera"', []);

            return resultado;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async insertReporte(payload: insertReporteDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<boolean>(
                'INSERT INTO reportes (fecha, titulo, descripcion, imagen, votos_positivos, votos_negativos, fk_idPersona, fk_idMunicipio, fk_idCategoria, estado) VALUES (?, ?, ?, ?, 0, 0, ?, ?, ?, "Espera")', 
            [payload.fecha,payload.titulo,payload.descripcion,JSON.stringify(payload.imagen),payload.fk_idPersona,payload.fk_idMunicipio, payload.fk_idCategoria]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarReporte(payload: modifyReporteDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE reportes SET titulo = ?, descripcion = ?, imagen = ? WHERE id_reporte = ?",
            [payload.titulo, payload.descripcion, JSON.stringify(payload.imagen), payload.id_reporte]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteReporte (id_reporte: number): Promise <boolean>{
        try{
            const result = await ConexionBD<any>("DELETE FROM reportes WHERE id_reporte = ?", [id_reporte]);
            return true;
        }catch (error){
            throw error;
        }
    }  

    async votarReporte (payload:votarReporteDTO): Promise <boolean>{
        try{
            let tipoVoto: 'votos_positivos' | 'votos_negativos';
            
            if (payload.votos_positivos !== undefined){
                tipoVoto = 'votos_positivos';
            } else if (payload.votos_negativos !== undefined){
                tipoVoto = 'votos_negativos';
            } else {
                throw new Error('Debe de proporcionar al menos un tipo de voto.');
            }

            const result = await ConexionBD<any>(`UPDATE reportes SET ${tipoVoto} = ${tipoVoto} + 1 WHERE id_reporte = ?`, [payload.id_reporte]);
            console.log(`UPDATE reportes SET ${tipoVoto} = ${tipoVoto} + 1 WHERE id_reporte = ?`);
            return true;
        }catch (error){
            console.error(error)
            throw error;
        }
    }  

    async modificarEstadoReporte (payload:modificarEstadoReporteDTO): Promise <boolean>{
        try{

            const existeReporte = await ConexionBD<any>('SELECT estado FROM reportes WHERE id_reporte=?', [payload.id_reporte]);

            if (!existeReporte || existeReporte.length === 0){
                throw new Error('El reporte solicitado no existe.');
            }

            const estadoReporte = existeReporte[0].estado;

            if(estadoReporte !=='Espera'){
                throw new Error('El reporte debe de tener el estado en "Espera" para poder modificar su estado.')
            }

            const result = await ConexionBD<any>(`UPDATE reportes SET estado = ? WHERE id_reporte = ?`, [payload.estado, payload.id_reporte]);
            console.log(result);
            return true;
        }catch (error){
            console.error(error)
            throw error;
        }
    }  

}
