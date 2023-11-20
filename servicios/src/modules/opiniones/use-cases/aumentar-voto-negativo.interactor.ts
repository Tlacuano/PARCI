import { UseCase } from "../../../kernel/contracts";
import { OpinionesRepository } from "./ports/opiniones.Repository";



export class AumentarVotoNegativoInteractor implements UseCase<number,boolean>{
    constructor(private opinionesRepository: OpinionesRepository) { }
    
    execute(payload: number): Promise<boolean> {
        if(payload === 0 || payload === undefined){
            throw new Error('Campos requeridos incompletos');
        }

        return this.opinionesRepository.aumentarVotoNegativo(payload);
    }
}