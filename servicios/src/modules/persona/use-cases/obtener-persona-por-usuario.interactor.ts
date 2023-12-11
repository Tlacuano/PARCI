import { UseCase } from "src/kernel/contracts";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "./ports/persona.repository";
import { NombreUsuarioDTO } from "../adapters/dtos/nombre-usuaruo.dto";


export class GetPersonaInfoUsuario implements UseCase<NombreUsuarioDTO, Persona> {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(payload: NombreUsuarioDTO): Promise<Persona> {
        return await this.repository.getPersonaInfoByUsuario(payload);
    }
    }