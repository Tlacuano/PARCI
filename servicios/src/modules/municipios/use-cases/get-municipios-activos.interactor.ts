import { UseCase } from "src/kernel/contracts";
import { MunicipioRepository } from "./ports/municipio.repository";
import { MunicipioActivo } from "../adapters/dtos/muncipio-activo.dto";

export class GetMunicipiosActivosInteractor implements UseCase<void, MunicipioActivo[]> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(): Promise<MunicipioActivo[]> {
        return await this.repository.getMunicipiosActivos();
    }
}