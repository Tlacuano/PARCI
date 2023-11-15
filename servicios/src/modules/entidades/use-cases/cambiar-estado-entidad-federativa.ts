import { UseCase } from "src/kernel/contracts";
import { CambiarEstadoEntidadFederativaDTO } from "../adapters/dtos/cambiar-estado-entidad-federativa.dto";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class CambiarEstadoEntidadFederativaInteractor implements UseCase<CambiarEstadoEntidadFederativaDTO, boolean> {
    constructor(private readonly repository: EntidadFederativaRepository) { }

    async execute(payload: CambiarEstadoEntidadFederativaDTO): Promise<boolean> {
        return this.repository.cambiarEstadoEntidadFederativa(payload);
    }
}