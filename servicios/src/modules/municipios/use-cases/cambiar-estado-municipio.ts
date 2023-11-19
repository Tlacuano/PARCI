import { UseCase } from "../../../kernel/contracts";
import { CambiarEstadoMunicipioDTO } from "../adapters/dtos/cambiar-estado-municipio.dto";
import { MunicipioRepository } from "./ports/municipio.repository";

export class CambiarEstadoMunicipioInteractor implements UseCase<CambiarEstadoMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: CambiarEstadoMunicipioDTO): Promise<boolean> {
        if (payload.estado !== 0 && payload.estado !== 1) {
            throw new Error("Estado invalido");
        }
        return this.repository.cambiarEstadoMunicipio(payload);
    }
}