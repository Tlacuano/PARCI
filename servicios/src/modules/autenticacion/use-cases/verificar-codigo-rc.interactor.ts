import { UseCase } from "../../../kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class VerificarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,registrarCodigoUsuarioDto>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: registrarCodigoUsuarioDto): Promise<registrarCodigoUsuarioDto> {
        if(!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if(!payload.codigo || payload.codigo === '') {
            throw new Error('El codigo es requerido');
        }

        return this.autenticacionRepository.verificarCodigo(payload);
    }
}