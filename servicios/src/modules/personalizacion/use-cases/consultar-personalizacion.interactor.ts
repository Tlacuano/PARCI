import { UseCase } from "../../../kernel/contracts";
import { Personalizacion } from "../entities/personalizacion";
import { PersonalizacionRepository } from "./ports/personalizacion.repository";



export class ConsultarPersonalizacionInteractor implements UseCase<string, Personalizacion>{
    constructor(private personalizacionRepository:PersonalizacionRepository ) {}

    execute(payload: string): Promise<Personalizacion> {
        return this.personalizacionRepository.consultarPersonalizacion(payload);
    }

}