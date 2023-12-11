import { UseCase } from "@/kernel/contracts";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { ResponseApi } from "@/kernel/types";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";

export class BuscarUsuarioPorNombreInteractor implements UseCase<RegistrarUsuarioDTO, ResponseApi<Usuario[]|null>>{
    constructor(private UsuarioRepository: UsuarioRepository) {}

    execute(payload: RegistrarUsuarioDTO): Promise<ResponseApi<Usuario[] |null>> {
        return this.UsuarioRepository.buscarUsuarioPorNombre(payload);
    }
}