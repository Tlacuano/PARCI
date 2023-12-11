import { UseCase } from "@/kernel/contracts";
import { UsuarioRepository } from "./ports/usuario.repository";
import { ResponseApi } from "@/kernel/types";
import { Usuario } from "../entities/usuario";





export class GetUsuariosInteractor implements UseCase<void, ResponseApi<Usuario[]>>{
    constructor (private usuarioRepository : UsuarioRepository) { }

    execute(): Promise<ResponseApi<Usuario[]>> {
        return this.usuarioRepository.getUsuarios();
    }

}