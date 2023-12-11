import { UseCase } from "src/kernel/contracts";
import { RegistrarEntidadFederativaDTO } from "../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class BuscarEntidadPorNombreInteractor implements UseCase<RegistrarEntidadFederativaDTO, EntidadFederativa[] | null> {
    constructor(private readonly repository: EntidadFederativaRepository) {}

    async execute(payload: RegistrarEntidadFederativaDTO): Promise<EntidadFederativa[] | null> {
        return this.repository.buscarEntidadPorNombre(payload);
    }
}