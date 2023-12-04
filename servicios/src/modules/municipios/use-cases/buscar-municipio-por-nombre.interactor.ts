import { UseCase } from "../../../kernel/contracts";
import { Municipio } from "../entities/municipio";
import { MunicipioRepository } from "./ports/municipio.repository";

export class BuscaMunicipioPorNombreInteractor implements UseCase<string, Municipio[] | null> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: string): Promise<Municipio[] | null> {
        return this.repository.buscarMunicipioPorNombre(payload);
    }
}