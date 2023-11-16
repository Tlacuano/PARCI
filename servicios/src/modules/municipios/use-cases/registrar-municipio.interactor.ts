import { UseCase } from "src/kernel/contracts";
import { RegistrarMunicipioDTO } from "../adapters/dtos/registrar-municipio.dto";
import { MunicipioRepository } from "./ports/municipio.repository";

export class RegistrarMunicipioInteractor implements UseCase<RegistrarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: RegistrarMunicipioDTO): Promise<boolean> {
        return await this.repository.registrarMunicipio(payload);
    }
}