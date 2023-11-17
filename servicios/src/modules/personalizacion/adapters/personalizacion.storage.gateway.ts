import { Personalizacion } from "../entities/personalizacion";
import { PersonalizacionRepository } from "../use-cases/ports/personalizacion.repository";
import { ConexionBD } from "../../../utils/dbconfig";




export class PersonalizacionStorageGateway implements PersonalizacionRepository{
    async registrarPersonalizacionPorDefecto(payload: string): Promise<boolean> {
        try {
            const respuesta = await ConexionBD<any>('INSERT INTO personalizacion (tamaño_letra, tema, fk_idUsuario) VALUES (?,?,(SELECT id_usuario from usuarios WHERE usuario = ?))',['Mediana', 'Claro', payload]);
            if(respuesta !== 0){
                throw new Error('Server error');
            }

            return true;
        }catch (error) {
            throw error;
        }   
    }

    async consultarPersonalizacion(payload: string): Promise<Personalizacion> {
        try {
            const respuesta = await ConexionBD<Personalizacion[]>('SELECT tamaño_letra, tema FROM personalizacion JOIN usuarios ON fk_idUsuario = id_usuario WHERE usuario = ?',[payload]);

            return respuesta[0];
        } catch (error) {
            throw error;
        }
    }

    async modificarPersonalizacion(payload: Personalizacion): Promise<boolean> {
        try {
            const resupuesta = await ConexionBD<any>('UPDATE personalizacion SET tamaño_letra = ?, tema = ? WHERE fk_idUsuario = (SELECT id_usuario FROM usuarios WHERE usuario = ?)',[payload.tamaño_letra, payload.tema, payload.usuario]);
            
            if(resupuesta.affectedRows === 0) {
                throw new Error('No se pudo modificar la personalizacion');
            }
            

            return true;
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }

}