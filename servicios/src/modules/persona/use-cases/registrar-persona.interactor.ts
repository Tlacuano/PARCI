import { UseCase } from "src/kernel/contracts";
import { RegistrarPersonaDTO } from "../adapters/dtos/registrar-persona.dto";
import { PersonaRepository } from "./ports/persona.repository";

export class RegistrarPersonaInteractor
    implements UseCase<RegistrarPersonaDTO, boolean>
    {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(payload: RegistrarPersonaDTO): Promise<boolean> {

        if (!payload.nombre || !payload.apellido_paterno || !payload.apellido_materno || !payload.correo_electronico || !payload.fecha_nacimiento || !payload.fk_idMunicipio) {
            throw new Error("Campos requeridos incompletos");
        }

        return await this.repository.registrarPersona(payload);
    }
    }