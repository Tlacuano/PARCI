import { Personalizacion } from "../entities/personalizacion";
import { PersonalizacionRepository } from "../use-cases/ports/personalizacion.repository";
import { ConexionBD } from "../../../utils/dbconfig";




export class PersonalizacionStorageGateway implements PersonalizacionRepository{
    registrarPersonalizacionPorDefecto(payload: Personalizacion): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async consultarPersonalizacion(payload: string): Promise<Personalizacion> {
        try {
            const respuesta = await ConexionBD<Personalizacion[]>('select tamaño_letra, tema from personalizacion join usuarios on fk_idUsuario = id_usuario where usuario = ?',[payload]);

            return respuesta[0];
        } catch (error) {
            throw error;
        }
    }

    async modificarPersonalizacion(payload: Personalizacion): Promise<boolean> {
        try {
            const resupuesta = await ConexionBD<any>('update personalizacion set tamaño_letra = ?, tema = ? where fk_idUsuario = (select id_usuario from usuarios where usuario = ?)',[payload.tamaño_letra, payload.tema, payload.usuario]);
            
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