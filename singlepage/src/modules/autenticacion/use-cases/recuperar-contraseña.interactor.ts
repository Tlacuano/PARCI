import { UseCase } from "../../../kernel/contracts";
import { RecuperarContraseñaDto } from "../adapters/dtos/recuperar-contraseña.dto";
import { ResponseApi } from "../../../kernel/types";
import { AutenticacionRepository } from "./ports/autenticacion.repository";



export class RecuperarContraseñaInteractor implements UseCase<RecuperarContraseñaDto,ResponseApi<boolean>> {
    constructor(
        private autencicacionRepository: AutenticacionRepository
    ) {}
    execute(payload: RecuperarContraseñaDto): Promise<ResponseApi<boolean>> {
        return this.autencicacionRepository.registrarUsuario(payload);
    }

}