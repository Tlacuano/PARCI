import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { Persona } from "../entities/persona";
import { PersonaRepository } from "./ports/persona.repository";


export class GetPersonaInfoUsuario implements UseCase<string, ResponseApi<Persona>> {
    constructor(private readonly repository: PersonaRepository) {}
    
    async execute(usuario: string): Promise<ResponseApi<Persona>> {
        return await this.repository.getPersonaInfoByUsuario(usuario);
    }
    }