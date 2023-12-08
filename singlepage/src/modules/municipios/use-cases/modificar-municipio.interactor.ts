import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { MunicipioRepository } from "./ports/municipios.repository";
import { ModificarMunicipioDTO } from "../adapters/dtos/modificar-municipio.dto";

export class ModificarMunicipioInteractor implements UseCase<ModificarMunicipioDTO, ResponseApi<boolean>> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(payload: ModificarMunicipioDTO): Promise<ResponseApi<boolean>> {
        return this.municipioRepository.modificarMunicipio(payload);
    }
}