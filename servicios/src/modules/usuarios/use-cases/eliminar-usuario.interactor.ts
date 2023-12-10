import { UsuarioRepository } from "./ports/usuario.repository";
import { UseCase } from "src/kernel/contracts";
import { Usuario } from "../entities/usuario";
import { EliminarUsuarioDTO } from "../adapters/dtos/eliminar-usuario.dto";

export class EliminarUsuarioInteractor implements UseCase<EliminarUsuarioDTO, boolean> {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(payload: EliminarUsuarioDTO): Promise<boolean> {

        if (!payload.usuario) {
            throw new Error("Campos requeridos incompletos");
        }

        return await this.repository.eliminarUsuario(payload);
    }
}