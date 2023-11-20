import { UseCase } from "src/kernel/contracts";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { UsuarioRepository } from "./ports/usuario.repository";

export class RegistrarUsuarioInteractor
    implements UseCase<RegistrarUsuarioDTO, boolean>
    {
    constructor(private readonly repository: UsuarioRepository) {}
    
    async execute(payload: RegistrarUsuarioDTO): Promise<boolean> {

        if (!payload.usuario || !payload.contrasena) {
            throw new Error("Campos requeridos incompletos");
        }

        return await this.repository.registrarUsuario(payload);
    }
    }