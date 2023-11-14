import { UseCase } from "../../../kernel/contracts";
import { recuperarContraseñaDto } from "../adapters/dtos/recuperar-contraseña.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RecuperarContraseñaInteractor implements UseCase<recuperarContraseñaDto,boolean>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: recuperarContraseñaDto): Promise<boolean> {
        return this.autenticacionRepository.recuperarContraseña(payload);
    }
}