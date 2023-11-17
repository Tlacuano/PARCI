import { UseCase } from "../../../kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";




export class BuscarUsuarioInteractor implements UseCase<registrarCodigoUsuarioDto,registrarCodigoUsuarioDto>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto> {
        if(!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        
        return this.autenticacionRepository.buscarUsuario(payload);
    }
}