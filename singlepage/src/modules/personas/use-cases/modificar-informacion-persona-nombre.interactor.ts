import { UseCase } from "@/kernel/contracts";
import { ModificarCuentaPersonaDTO } from "../adapters/dtos/modificar-persona.dto";
import { ResponseApi } from "@/kernel/types";
import { PersonaRepository } from "./ports/persona.repository";
import { Persona } from "../entities/persona";

export class ModificarInformacionPersonaInteractorNombre implements UseCase<ModificarCuentaPersonaDTO, ResponseApi<boolean>>{

    constructor(private personaRepository: PersonaRepository) {}

    async execute(payload: ModificarCuentaPersonaDTO): Promise<ResponseApi<boolean>> {

        if (!payload.usuario) {
            throw new Error("El campo 'usuario' es requerido para la modificación");
        }
      
        const personaInfo = await this.personaRepository.getPersonaInfoByUsuario(payload.usuario);

        if (personaInfo.data) {
            const payloadCompleto = {
                id_persona: personaInfo.data.id_persona,
                ...payload,
            };

            return this.personaRepository.modificarPersona(payloadCompleto);
        } else {
            throw new Error("No se encontró información de la persona");
        }
    }
}