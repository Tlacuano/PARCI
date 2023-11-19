import { UseCase } from "src/kernel/contracts";
import { RegistrarMunicipioDTO } from "../adapters/dtos/registrar-municipio.dto";
import { Municipio } from "../entities/municipios";
import { MunicipioRepository } from "./ports/municipio.repository";

export class BuscaMunicipioPorNombreInteractor implements UseCase<RegistrarMunicipioDTO, Municipio[] | null> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: RegistrarMunicipioDTO): Promise<Municipio[] | null> {
        return this.repository.buscarMunicipioPorNombre(payload);
    }
}