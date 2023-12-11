import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RegistrarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,ResponseApi<boolean> > {
    constructor(private autenticacionRepository: AutenticacionRepository) {}
    
    execute(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>> {
        return this.autenticacionRepository.registrarCodigo(payload);
    }
}