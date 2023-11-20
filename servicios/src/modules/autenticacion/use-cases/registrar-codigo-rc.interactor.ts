import { UseCase } from "../../../kernel/contracts";
import { registrarCodigoUsuarioDto } from "../adapters/dtos/registrar-codigo-usuario.dto";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RegistrarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,boolean>{
    constructor(private autenticacionRepository: AutenticacionRepository) {}

    execute(payload: registrarCodigoUsuarioDto): Promise<boolean> {
        if(!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if(!payload.codigo || payload.codigo === '') {
            throw new Error('Error al generar el codigo');
        }

        return this.autenticacionRepository.registrarCodigo(payload);
    }
}