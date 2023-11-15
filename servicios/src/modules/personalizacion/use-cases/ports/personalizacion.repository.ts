import { Personalizacion } from './../../entities/personalizacion';



export interface PersonalizacionRepository {
    registrarPersonalizacionPorDefecto(payload: Personalizacion): Promise<boolean>;

    modificarPersonalizacion(payload: Personalizacion): Promise<boolean>;
    consultarPersonalizacion(payload: string): Promise<Personalizacion>;

}