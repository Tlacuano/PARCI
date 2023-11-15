import { Personalizacion } from '../entities/personalizacion';
import { UseCase } from './../../../kernel/contracts';
import { PersonalizacionRepository } from './ports/personalizacion.repository';



export class ModificarPersonalizacionInteractor implements UseCase<Personalizacion, boolean>{
    constructor(private presonalizacionRepository : PersonalizacionRepository) {}

    execute(payload: Personalizacion): Promise<boolean> {
        return this.presonalizacionRepository.modificarPersonalizacion(payload);
    }

}