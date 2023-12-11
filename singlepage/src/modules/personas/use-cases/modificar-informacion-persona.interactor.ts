import { ResponseApi } from "@/kernel/types";
import { ModificarInformacionPersonaDTO } from "../adapters/dtos/modificar-informacion-persona.dto";
import { PersonaRepository } from "./ports/persona.repository";
import { UseCase } from "@/kernel/contracts";



export class ModificarInformacionPersonaInteractor implements UseCase<ModificarInformacionPersonaDTO, ResponseApi<boolean>> {
  constructor(private personaRepository: PersonaRepository) {}

  execute(payload: ModificarInformacionPersonaDTO): Promise<ResponseApi<boolean>> {
    return this.personaRepository.modificarInformacionPersona(payload);
  }
}