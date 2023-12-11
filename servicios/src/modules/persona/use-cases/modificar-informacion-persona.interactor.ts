import { UseCase } from "src/kernel/contracts";
import { PersonaRepository } from "./ports/persona.repository";
import { ModificarInformacionPersonaDTO } from "../adapters/dtos/modificar-informacion-persona.dto";

export class ModificarInformacionPersonaInteractor
    implements UseCase<ModificarInformacionPersonaDTO, boolean>
    {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(payload: ModificarInformacionPersonaDTO): Promise<boolean> {

        if (!payload.nombre || !payload.apellido_paterno || !payload.apellido_materno || !payload.correo_electronico) {
            throw new Error("Campos requeridos incompletos");
        }

        if (payload.nombre.includes(" ")) {
            throw new Error("El nombre no debe tener espacios");
        }

     

        if (payload.apellido_paterno.includes(" ")) {
            throw new Error("El apellido paterno no debe tener espacios");
        }


        if (payload.apellido_materno.includes(" ")) {
            throw new Error("El apellido materno no debe tener espacios");
        }



        return await this.repository.modificarInformacionPersona(payload);
    }
    }