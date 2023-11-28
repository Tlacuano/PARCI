import { Personalizacion } from "../entities/personalizacion";
import { Personalizacionrepository } from "../use-cases/ports/personalizacion.repository";
import api from '../../../config/http-client.gateway';
import { ResponseApi } from "../../../kernel/types";



export class PersonalizacionStorageGateway implements Personalizacionrepository {


    async modificarPersonalizacion(payload: Personalizacion): Promise<ResponseApi<Personalizacion>> {
        const respuesta = await api.doPost('/personalizacion/modificar', payload);
        return{
            ...respuesta.data
        } as ResponseApi<Personalizacion>
    }
    
}