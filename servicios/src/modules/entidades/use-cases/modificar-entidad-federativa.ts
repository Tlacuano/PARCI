import { UseCase } from "src/kernel/contracts";
import { RegistrarEntidadFederativaDTO } from "../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { ModificarEntidadFederativaDTO } from "../adapters/dtos/modificar-entidad-federativa.dto";

export class ModificarEntidadFederativaInteractor implements UseCase<ModificarEntidadFederativaDTO, boolean> {
    constructor(private readonly repository: EntidadFederativaRepository) { }

    async execute(payload: ModificarEntidadFederativaDTO): Promise<boolean> {
        return this.repository.modificarEntidadFederativa(payload);
    }
}