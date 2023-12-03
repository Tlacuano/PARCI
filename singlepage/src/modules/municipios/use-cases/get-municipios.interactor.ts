import { ResponseApi } from "@/kernel/types";
import { UseCase } from "@/kernel/contracts";
import { Municipio } from "../entities/municipio";
import { MunicipioRepository } from "./ports/municipios.repository";

export class GetMunicipiosInteractor implements UseCase<void, ResponseApi<Municipio[]>> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(): Promise<ResponseApi<Municipio[]>> {
        return this.municipioRepository.getMunicipios();
    }
}