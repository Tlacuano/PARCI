import { ModificarPersonalizacionInteractor } from './../use-cases/modificar-personalizacion.interactor';
import { ResponseApi } from '../../../kernel/types';
import { Personalizacionrepository } from '../use-cases/ports/personalizacion.repository';
import { Personalizacion } from './../entities/personalizacion';
import { PersonalizacionStorageGateway } from './personalizacion.storage.gateway';


export class PersonalizacionController{
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message
        } as ResponseApi<any>
    }

    modificarPersonalizacion = async (payload: Personalizacion) => {
        try {
            const repositorio: Personalizacionrepository = new PersonalizacionStorageGateway();
            const modificarPersonalizacionInteractor = new ModificarPersonalizacionInteractor(repositorio);

            const respuesta = await modificarPersonalizacionInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }
}