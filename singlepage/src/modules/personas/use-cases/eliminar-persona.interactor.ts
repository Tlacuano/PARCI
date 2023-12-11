import { ResponseApi } from "@/kernel/types";
import { EliminarPersonaDTO } from "../adapters/dtos/eliminar-persona.dto";
import { UseCase } from "@/kernel/contracts";
import { PersonaRepository } from "./ports/persona.repository";



export class EliminarPersonaInteractor implements UseCase<EliminarPersonaDTO, ResponseApi<boolean>> {
  constructor(private personaRepository: PersonaRepository) {}

  execute(payload: EliminarPersonaDTO): Promise<ResponseApi<boolean>> {

    if (!payload.id_persona) {
      throw new Error("Campos requeridos incompletos");
    }

    return this.personaRepository.eliminarPersona(payload);
  }
}