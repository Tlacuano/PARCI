import { UseCase } from "src/kernel/contracts";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";
import { ModificarRolUsuarioDTO } from "../adapters/dtos/modificar-rol-usuario.dto";

export class ModificarRolUsuarioInteractor implements UseCase<ModificarRolUsuarioDTO, boolean> {
    constructor(private readonly repository: UsuarioRepository) { }

    async execute(payload: ModificarRolUsuarioDTO): Promise<boolean> {

        if (!payload.id_usuario || !payload.rol) {
            throw new Error("Campos requeridos incompletos");
        }

        return this.repository.modificarRolUsuario(payload);
    }
}