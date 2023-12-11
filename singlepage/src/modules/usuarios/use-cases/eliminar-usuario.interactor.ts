import { UseCase } from "@/kernel/contracts";
import { EliminarUsuarioDTO } from "../adapters/dtos/eliminar-usuario.dto";
import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "./ports/usuario.repository";





export class EliminarUsuarioInteractor implements UseCase<EliminarUsuarioDTO, ResponseApi<boolean>> {
  constructor(private usuarioRepository: UsuarioRepository) {}

  execute(payload: EliminarUsuarioDTO): Promise<ResponseApi<boolean>> {
    return this.usuarioRepository.eliminarUsuario(payload);
  }
}