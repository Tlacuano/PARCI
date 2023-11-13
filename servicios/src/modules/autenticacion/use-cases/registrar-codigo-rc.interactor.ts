import { UseCase } from "src/kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RegistrarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,boolean>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: registrarCodigoUsuarioDto): Promise<boolean> {
        return this.autenticacionRepository.registrarCodigo(payload);
    }
}