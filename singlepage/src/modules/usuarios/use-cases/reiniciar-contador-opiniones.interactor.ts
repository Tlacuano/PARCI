import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "./ports/usuario.repository";






export class ReiniciarContadorOpinionesInteractor implements UseCase<string,ResponseApi<boolean>>{
    constructor(private usuarioRepository : UsuarioRepository) { }

    execute(payload: string): Promise<ResponseApi<boolean>> {
        if (!payload) {
            throw new Error("El usuario es requerido");
        }
        return this.usuarioRepository.reiniciarContadorOpiniones(payload);
    }
}