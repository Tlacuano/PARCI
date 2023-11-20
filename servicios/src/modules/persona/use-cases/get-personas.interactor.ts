import { UseCase } from "src/kernel/contracts";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "./ports/persona.repository";

export class GetPersonasInteractor implements UseCase<void, Persona[]> {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(): Promise<Persona[]> {
        return await this.repository.getPersonas();
    }
    }