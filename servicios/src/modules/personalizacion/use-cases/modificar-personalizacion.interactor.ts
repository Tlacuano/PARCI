import { Personalizacion } from '../entities/personalizacion';
import { UseCase } from './../../../kernel/contracts';
import { PersonalizacionRepository } from './ports/personalizacion.repository';



export class ModificarPersonalizacionInteractor implements UseCase<Personalizacion, boolean>{
    constructor(private presonalizacionRepository : PersonalizacionRepository) {}

    execute(payload: Personalizacion): Promise<boolean> {

        if(!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if(!payload.tema || payload.tema === '') {
            throw new Error('El tema es requerido');
        }
        if(!payload.tamaño_letra || payload.tamaño_letra === '') {
            throw new Error('El tamaño de letra es requerido');
        }
        if(payload.tamaño_letra !== 'Chica' && payload.tamaño_letra !== 'Mediana' && payload.tamaño_letra !== 'Grande') {
            throw new Error('Tamaño de letra inválido');
        }
        if(payload.tema !== 'Claro' && payload.tema !== 'Oscuro') {
            throw new Error('Tema inválido');
        }
        
        return this.presonalizacionRepository.modificarPersonalizacion(payload);
    }

}