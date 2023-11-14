import { Personalizacion } from "../entities/personalizacion";
import { PersonalizacionRepository } from "../use-cases/ports/personalizacion.repository";
import { ConexionBD } from "../../../utils/dbconfig";




export class PersonalizacionStorageGateway implements PersonalizacionRepository{
    registrarPersonalizacionPorDefecto(payload: Personalizacion): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    modificarPersonalizacion(payload: Personalizacion): Promise<Personalizacion> {
        throw new Error("Method not implemented.");
    }
    async consultarPersonalizacion(payload: string): Promise<Personalizacion> {
        try {
            const response = await ConexionBD<Personalizacion[]>('select tamaño_letra, tema from personalizacion where usuario = ?',[payload]);

            return response[0];
        } catch (error) {
            throw error;
        }
    }

}