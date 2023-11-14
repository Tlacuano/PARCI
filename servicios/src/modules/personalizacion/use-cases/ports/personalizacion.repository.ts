import { Personalizacion } from './../../entities/personalizacion';



export interface PersonalizacionRepository {
    registrarPersonalizacionPorDefecto(payload: Personalizacion): Promise<boolean>;

    modificarPersonalizacion(payload: Personalizacion): Promise<Personalizacion>;
    consultarPersonalizacion(payload: string): Promise<Personalizacion>;

}