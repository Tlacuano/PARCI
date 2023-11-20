import { UseCase } from "src/kernel/contracts";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";

export class GetUsuariosInteractor implements UseCase<void, Usuario[]> {
    constructor(private readonly repository: UsuarioRepository) {}
    
    async execute(): Promise<Usuario[]> {
        return await this.repository.getUsuarios();
    }
    }