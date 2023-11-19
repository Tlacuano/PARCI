import { UseCase } from "../../../kernel/contracts";
import { Municipio } from "../entities/municipios";
import { MunicipioRepository } from "./ports/municipio.repository";

export class GetMunicipiosInteractor implements UseCase<void, Municipio[]> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: void): Promise<Municipio[]> {
        return await this.repository.getMunicipios();
    }
}