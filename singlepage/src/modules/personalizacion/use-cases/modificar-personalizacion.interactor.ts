import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { Personalizacion } from "../entities/personalizacion";
import { Personalizacionrepository } from "./ports/personalizacion.repository";



export class ModificarPersonalizacionInteractor implements UseCase<Personalizacion, ResponseApi<Personalizacion>>{
        
        constructor(private personalizacionRepository: Personalizacionrepository) {}
    
        execute(payload: Personalizacion): Promise<ResponseApi<Personalizacion>> {
            return this.personalizacionRepository.modificarPersonalizacion(payload);
        }
}