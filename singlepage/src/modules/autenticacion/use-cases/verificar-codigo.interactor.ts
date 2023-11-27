import { registrarCodigoUsuarioDto } from './../adapters/dtos/registrar-codigo-usuario.dto';
import { UseCase } from "../../../kernel/contracts";
import { ResponseApi } from '../../../kernel/types';
import { AutenticacionRepository } from './ports/autenticacion.repository';



export class VerificarCodigoInteractor implements UseCase<registrarCodigoUsuarioDto,ResponseApi<boolean>> {
    constructor(
        private readonly autenticacionRepository: AutenticacionRepository
    ){}

    async execute(payload: registrarCodigoUsuarioDto): Promise<ResponseApi<boolean>> {
        return await this.autenticacionRepository.verificarCodigo(payload);
    }
}
