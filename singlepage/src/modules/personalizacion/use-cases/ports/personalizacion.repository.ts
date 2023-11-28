import { ResponseApi } from "../../../../kernel/types";
import { Personalizacion } from "../../entities/personalizacion";



export interface Personalizacionrepository {
    modificarPersonalizacion(payload: Personalizacion): Promise<ResponseApi<Personalizacion>>
}