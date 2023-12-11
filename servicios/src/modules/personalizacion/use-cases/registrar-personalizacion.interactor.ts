import { UseCase } from "../../../kernel/contracts";
import { PersonalizacionRepository } from "./ports/personalizacion.repository";



export class RegistrarPersonalizacionInteractor implements UseCase<string, boolean>{
    constructor(private presonalizacionRepository : PersonalizacionRepository) {}

    execute(payload: string): Promise<boolean> {
        if(!payload || payload === '') {
            throw new Error('El usuario es requerido');
        }

        return this.presonalizacionRepository.registrarPersonalizacionPorDefecto(payload);
    }

}