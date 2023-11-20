import { UseCase } from "src/kernel/contracts"; 
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";


export class BuscarUsuarioPorNombreInteractor implements UseCase<RegistrarUsuarioDTO, Usuario[] | null> {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(payload: RegistrarUsuarioDTO): Promise<Usuario[] | null> {
        return this.repository.buscarUsuarioPorNombre(payload);
    }
}