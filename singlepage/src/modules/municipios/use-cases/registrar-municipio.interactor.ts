import { ResponseApi } from "@/kernel/types";
import { UseCase } from "@/kernel/contracts";
import { RegistrarMunicipioDTO } from "../adapters/dtos/registrar-municipio.dto";
import { MunicipioRepository } from "./ports/municipios.repository";

export class RegistrarMunicipioInteractor implements UseCase<RegistrarMunicipioDTO, ResponseApi<boolean>> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(payload: RegistrarMunicipioDTO): Promise<ResponseApi<boolean>> {
        return this.municipioRepository.registrarMunicipio(payload);
    }
}