import { UseCase } from "src/kernel/contracts";
import { PersonaRepository } from "./ports/persona.repository";
import { ModificarInformacionPersonaDTO } from "../adapters/dtos/modificar-informacion-persona.dto";
import { regexValidationAlMenosUnaMayuscula, regexValidationNoCaracteresEspeciales } from "src/kernel/validation";

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

        if(regexValidationAlMenosUnaMayuscula.test(payload.nombre)){
            throw new Error("El nombre debe tener al menos una mayuscula");
        }

        if (payload.apellido_paterno.includes(" ")) {
            throw new Error("El apellido paterno no debe tener espacios");
        }

        if(regexValidationAlMenosUnaMayuscula.test(payload.apellido_paterno)){
            throw new Error("El apellido paterno debe tener al menos una mayuscula");
        }

        if (payload.apellido_materno.includes(" ")) {
            throw new Error("El apellido materno no debe tener espacios");
        }

        if(regexValidationAlMenosUnaMayuscula.test(payload.apellido_materno)){
            throw new Error("El apellido materno debe tener al menos una mayuscula");
        }

        if (regexValidationNoCaracteresEspeciales.test(payload.nombre)) {
            throw new Error("El nombre no debe tener caracteres especiales");
        }

        if (regexValidationNoCaracteresEspeciales.test(payload.apellido_paterno)) {
            throw new Error("El apellido paterno no debe tener caracteres especiales");
        }

        if (regexValidationNoCaracteresEspeciales.test(payload.apellido_materno)) {
            throw new Error("El apellido materno no debe tener caracteres especiales");
        }


        return await this.repository.modificarInformacionPersona(payload);
    }
    }