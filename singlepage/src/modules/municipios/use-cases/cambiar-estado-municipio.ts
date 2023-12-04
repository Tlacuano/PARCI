import { ResponseApi } from "@/kernel/types";
import { UseCase } from "@/kernel/contracts";
import { MunicipioRepository } from "./ports/municipios.repository";
import { CambiarEstadoMunicipioDTO } from "../adapters/dtos/cambiar-estado-municipio.dto";

export class CambiarEstadoMunicipioInteractor implements UseCase<CambiarEstadoMunicipioDTO, ResponseApi<boolean>> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(payload: CambiarEstadoMunicipioDTO): Promise<ResponseApi<boolean>> {
        return this.municipioRepository.cambiarEstadoMunicipio(payload);
    }
}