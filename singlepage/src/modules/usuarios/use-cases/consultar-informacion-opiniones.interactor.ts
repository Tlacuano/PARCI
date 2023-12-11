import { UseCase } from "@/kernel/contracts";
import { InformacionOpinionesDto } from "../adapters/dtos/informacion-opiniones.dto";
import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "./ports/usuario.repository";
import { Usuario } from "../entities/usuario";





export class ConsultarInformacionOpinionesInteractor implements UseCase<string, ResponseApi<InformacionOpinionesDto>>{
    constructor (private usuarioRepository : UsuarioRepository) { }

    execute(payload: string): Promise<ResponseApi<Usuario>> {
        if (!payload) {
            throw new Error("El usuario es requerido");
        }
        return this.usuarioRepository.consultarInformacionOpiniones(payload);
    }

}