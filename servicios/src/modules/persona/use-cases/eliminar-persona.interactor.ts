import { UseCase } from "src/kernel/contracts";
import { PersonaRepository } from "./ports/persona.repository";
import { EliminarPersonaDTO } from "../adapters/dtos/eliminar-persona.dto";

export class EliminarPersonaInteractor implements UseCase<EliminarPersonaDTO, boolean> {
    constructor(private readonly repository: PersonaRepository) {}

    async execute(payload: EliminarPersonaDTO): Promise<boolean> {

        if (!payload.id_persona) {
            throw new Error("Campos requeridos incompletos");
        }

        return await this.repository.eliminarPersona(payload);
    }
}