import { Personalizacion } from './../../entities/personalizacion';



export interface PersonalizacionRepository {
    registrarPersonalizacionPorDefecto(payload: string): Promise<boolean>;

    modificarPersonalizacion(payload: Personalizacion): Promise<boolean>;
    consultarPersonalizacion(payload: string): Promise<Personalizacion>;

}