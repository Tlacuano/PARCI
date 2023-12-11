import { UseCase } from "src/kernel/contracts";
import { RegistrarPersonaDTO } from "../adapters/dtos/registrar-persona.dto";
import { PersonaRepository } from "./ports/persona.repository";
import { ResponseApi } from "@/kernel/types";

export class RegistrarPersonaInteractor
    implements UseCase<RegistrarPersonaDTO, ResponseApi<boolean>>
    {
    constructor(private personaRepository: PersonaRepository) {}
    
    execute(payload: RegistrarPersonaDTO): Promise<ResponseApi<boolean>> {

        if (!payload.nombre || !payload.apellido_paterno || !payload.apellido_materno || !payload.correo_electronico || !payload.fecha_nacimiento || !payload.fk_idMunicipio) {
            throw new Error("Campos requeridos incompletos");
        }

        return this.personaRepository.registrarPersona(payload);
    }
    }