import { ConexionBD } from "../../../utils/dbconfig";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";

export class EntidadFederativaStorageGateway implements EntidadFederativaRepository {
    async getEntidadesFederativas(): Promise<EntidadFederativa[]> {
        try {
            const resultado = await ConexionBD<EntidadFederativa[]>('SELECT id_entidad, nombre_entidad FROM entidades_federativas WHERE estado = 1',[]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    
}
