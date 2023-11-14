import { UseCase } from "../../../kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class VerificarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,registrarCodigoUsuarioDto>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto> {
        return this.autenticacionRepository.verificarCodigo(payload);
    }
}