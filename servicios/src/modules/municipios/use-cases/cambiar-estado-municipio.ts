import { UseCase } from "src/kernel/contracts";
import { CambiarEstadoMunicipioDTO } from "../adapters/dtos/cambiar-estado-municipio.dto";
import { MunicipioRepository } from "./ports/municipio.repository";

export class CambiarEstadoMunicipioInteractor implements UseCase<CambiarEstadoMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: CambiarEstadoMunicipioDTO): Promise<boolean> {
        return this.repository.cambiarEstadoMunicipio(payload);
    }
}