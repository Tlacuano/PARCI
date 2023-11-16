import { UseCase } from "src/kernel/contracts";
import { MunicipioRepository } from "./ports/municipio.repository";
import { ModificarMunicipioDTO } from "../adapters/dtos/modificar-municipio.dto";

export class ModificarMunicipioInteractor implements UseCase<ModificarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: ModificarMunicipioDTO): Promise<boolean> {
        return this.repository.modificarMunicipio(payload);
    }
}