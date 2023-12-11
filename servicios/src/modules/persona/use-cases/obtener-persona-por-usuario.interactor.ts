import { UseCase } from "src/kernel/contracts";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "./ports/persona.repository";


export class GetPersonaInfoUsuario implements UseCase<string, Persona> {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(usuario: string): Promise<Persona> {
        return await this.repository.getPersonaInfoByUsuario(usuario);
    }
    }