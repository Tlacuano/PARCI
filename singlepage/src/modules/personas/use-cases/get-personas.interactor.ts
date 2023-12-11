import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "./ports/persona.repository";



export class ObtenerPersonasInteractor implements UseCase<void, ResponseApi<Persona[]>> {
  constructor(private personaRepository: PersonaRepository) {}

  execute(): Promise<ResponseApi<Persona[]>> {
    return this.personaRepository.getPersonas();
  }
}