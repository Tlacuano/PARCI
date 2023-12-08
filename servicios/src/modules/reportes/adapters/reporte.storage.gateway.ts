import { ConexionBD } from "../../../utils/dbconfig";
import { Reporte } from "../entities/reporte";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { modificarEstadoReporteDTO } from "./dtos/modificar-estado-reporte.dto";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";
import { RequestConsultarReporteUsuarioDTO } from "./dtos/request-consultar-reporte-usuario.dto";
import { ResponseConsultarReporteUsuarioDTO } from "./dtos/response-consultar-reporte-usuario.dto";
import { ResponseConsultarVotoPorUsuarioDTO } from "./dtos/response-consultar-voto-por-usuario.dto";
import { ResponseReportesEnEsperaDto } from "./dtos/response-consultar-reportes-espera.dto";
import { ResponseConsultarReporteEsperaDto } from "./dtos/response-consultar-reporte-espera.dto";
import { RequestEliminarReporteDTO } from "./dtos/request-eliminar-reporte.dto";

export class ReporteStorageGateway implements ReporteRepository {

    async consultarReporteUsuario(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteUsuarioDTO> {        
        try {
            const resultado = await ConexionBD<ResponseConsultarReporteUsuarioDTO[]>(`SELECT
                                                                                        r.id_reporte,
                                                                                        r.titulo,
                                                                                        r.imagen,
                                                                                        r.descripcion,
                                                                                        DATE_FORMAT(r.fecha, '%Y-%m-%d') as fecha,
                                                                                        p.nombre,
                                                                                        p.apellido_paterno,
                                                                                        p.apellido_materno,
                                                                                        c.nombre_categoria,
                                                                                        c.color,
                                                                                        m.nombre_municipio,
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
                                                                                        AND r.id_reporte = ?
                                                                                    GROUP BY
                                                                                        r.id_reporte,
                                                                                        r.titulo,
                                                                                        r.imagen,
                                                                                        r.fecha,
                                                                                        p.nombre,
                                                                                        p.apellido_paterno,
                                                                                        p.apellido_materno,
                                                                                        c.nombre_categoria,
                                                                                        c.color,
                                                                                        m.nombre_municipio`, [payload.usuario,payload.id_reporte]);
            if(resultado.length === 0){
                throw new Error('No se encontró el reporte solicitado');
            }

            return resultado[0];

        } catch (error) {
            throw error;
        }
    }

    async getReporte(obtenerReporteDTO: ObtenerReporteDTO): Promise<ObtenerReportesDTO[]>{
        try{
            let queryPart1 =   `SELECT u.usuario, r.id_reporte, r.titulo, r.imagen, DATE_FORMAT(r.fecha, '%Y-%m-%d') as fecha, p.nombre, p.apellido_paterno, p.apellido_materno, c.nombre_categoria, c.color, COUNT(CASE WHEN vr.voto = 'positivo' THEN 1 END) AS votos_positivos, COUNT(CASE WHEN vr.voto = 'negativo' THEN 1 END) AS votos_negativos, MAX((SELECT vr_inner.voto FROM votos_reporte vr_inner  JOIN personas p_inner ON vr_inner.fk_idPersona = p_inner.id_persona JOIN usuarios u_inner ON p_inner.id_persona = u_inner.fk_idPersona WHERE vr_inner.fk_idReporte = r.id_reporte AND u_inner.usuario = ? LIMIT 1)) AS voto_usuario FROM reportes r JOIN personas p ON r.fk_idPersona = p.id_persona JOIN categorias c ON r.fk_idCategoria = c.id_categoria JOIN municipios m ON r.fk_idMunicipio = m.id_municipio LEFT JOIN votos_reporte vr ON r.id_reporte = vr.fk_idReporte LEFT JOIN usuarios u ON u.fk_idPersona = p.id_persona WHERE r.estado = 'Publicado' AND m.id_municipio = ?`;
            if(obtenerReporteDTO?.fecha){
                queryPart1 += ' AND r.fecha = ?';
            } else if (obtenerReporteDTO?.fk_idCategoria){
                queryPart1 += ' AND r.fk_idCategoria = ?';
            }

            const query = queryPart1 + ` GROUP BY r.id_reporte, r.titulo, r.imagen, r.fecha, p.nombre, p.apellido_paterno, p.apellido_materno, c.nombre_categoria, c.color, u.usuario ORDER BY r.fecha DESC, votos_positivos DESC;`;

            const result = await ConexionBD<ObtenerReportesDTO[]>(query, [obtenerReporteDTO.usuario, obtenerReporteDTO.fk_idMunicipio, obtenerReporteDTO.fecha || obtenerReporteDTO.fk_idCategoria]);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async obtenerReportesEnEspera(): Promise<ResponseReportesEnEsperaDto[]> {
        try {
            const resultado = await ConexionBD<ResponseReportesEnEsperaDto[]>("select r.id_reporte, r.titulo, r.descripcion, r.imagen, DATE_FORMAT(r.fecha, '%Y-%m-%d') as fecha, c.color, c.nombre_categoria, concat(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre_completo_persona, p.correo_electronico from reportes r join categorias c on r.fk_idCategoria = c.id_categoria join personas p on p.id_persona = r.fk_idPersona WHERE r.estado = 'Espera'", []);

            return resultado;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async insertReporte(payload: insertReporteDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<boolean>(
                'INSERT INTO reportes (fecha, titulo, descripcion, imagen, fk_idPersona, fk_idMunicipio, fk_idCategoria, estado) VALUES (?, ?, ?, ?, (SELECT id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?), ?, ?, "Espera")', 
                [payload.fecha,payload.titulo,payload.descripcion,payload.imagen,payload.usuario,payload.fk_idMunicipio,payload.fk_idCategoria]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async modificarReporte(payload: modifyReporteDTO): Promise<boolean> {
        try {
            const result = await ConexionBD<any>("UPDATE reportes SET titulo = ?, descripcion = ?, imagen = ? WHERE id_reporte = ?",
            [payload.titulo, payload.descripcion, payload.imagen, payload.id_reporte]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteReporte (payload: RequestEliminarReporteDTO): Promise <boolean>{
        try{
            const result = await ConexionBD<any>("DELETE FROM reportes WHERE id_reporte = ?", [payload.id_reporte]);
            return true;
        }catch (error){
            throw error;
        }
    } 

    async consultarVotoPorUsuario(payload: votarReporteDTO): Promise<ResponseConsultarVotoPorUsuarioDTO> {
        try {
            const resultado = await ConexionBD<ResponseConsultarVotoPorUsuarioDTO[]>('select vr.voto as voto_usuario from votos_reporte vr join reportes r on vr.fk_idReporte = r.id_reporte join personas p on vr.fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?) where r.id_reporte = ?;',[payload.usuario,payload.id_reporte]);

            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    async votarReporte (payload:votarReporteDTO): Promise <boolean>{
        try{
            const respuesta = await ConexionBD<any>('INSERT INTO votos_reporte (voto, fk_idPersona, fk_idReporte) VALUES (?,(select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?),?)', [payload.voto,payload.usuario,payload.id_reporte]);
            
            if(respuesta === 0){
                throw new Error('Server Error');
            }

            return true;
        }catch (error){
            throw error;
        }
    } 

    async modificarVotoPorUsuario(payload: votarReporteDTO): Promise<boolean> {
        try {
            const respuesta = await ConexionBD<any>('UPDATE votos_reporte SET voto = ? WHERE fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?) AND fk_idReporte = ?', [payload.voto, payload.usuario, payload.id_reporte]);

            if(respuesta.affectedRows === 0){
                throw new Error('Server Error');
            }

            return true;
        } catch (error) {
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

    async eliminarVotoReporte(payload: votarReporteDTO): Promise<boolean> {
        try {
            const respuesta = await ConexionBD<any>('DELETE FROM votos_reporte WHERE fk_idPersona = (select id_persona FROM personas join usuarios ON fk_idPersona = id_persona WHERE usuario = ?) AND fk_idReporte = ?', [payload.usuario, payload.id_reporte]);

            if(respuesta.affectedRows === 0){
                throw new Error('Server Error');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async consultarReporteEnEspera(payload: RequestConsultarReporteUsuarioDTO): Promise<ResponseConsultarReporteEsperaDto> {
        try {
            const resultado = await ConexionBD<ResponseConsultarReporteEsperaDto[]>(` select 
            r.id_reporte, 
            r.fecha, 
            r.titulo, 
            r.descripcion, 
            r.imagen,
            concat(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre_completo_persona,
            p.correo_electronico,
            c.nombre_categoria,
            c.color,
            m.nombre_municipio
        from 
            reportes r
        join
            personas p on r.fk_idPersona = p.id_persona
        join
            categorias c on r.fk_idCategoria = c.id_categoria
        join 
            municipios m on r.fk_idMunicipio = m.id_municipio
        where id_reporte = ?`, [payload.id_reporte]);

        if(resultado.length === 0){
            throw new Error('No se encontró el reporte solicitado');
        }

        return resultado[0];
        } catch (error) {
            throw error;
        }
    }
}
