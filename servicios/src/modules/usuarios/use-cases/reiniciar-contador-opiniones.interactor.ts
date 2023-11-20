import { UseCase } from "../../../kernel/contracts";
import { UsuarioRepository } from "./ports/usuario.repository";



export class ReiniciarContadorOpinionesInteractor implements UseCase<string,boolean>{
    constructor(private usuarioRepository : UsuarioRepository) { }

    execute(payload: string): Promise<boolean> {
        if (!payload) {
            throw new Error("El usuario es requerido");
        }
        return this.usuarioRepository.reiniciarContadorOpiniones(payload);
    }
}