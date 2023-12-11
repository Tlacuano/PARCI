import { ResponseApi } from "@/kernel/types";
import { ModificarInformacionOpinionesDTO } from "../adapters/dtos/modificar-informacion-opiniones.dto";
import { UseCase } from "@/kernel/contracts";
import { UsuarioRepository } from "./ports/usuario.repository";




export class ModificarInformacionOpinionesInteractor implements UseCase<ModificarInformacionOpinionesDTO, ResponseApi<boolean>>{
    constructor (private usuarioRepository : UsuarioRepository) { }

    execute(payload: ModificarInformacionOpinionesDTO): Promise<ResponseApi<boolean>> {
        return this.usuarioRepository.modificarInformacionOpiniones(payload);
    }
}