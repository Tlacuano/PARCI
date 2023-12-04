import { ResponseApi } from "@/kernel/types";
import { UseCase } from "@/kernel/contracts";
import { Municipio } from "../entities/municipio";
import { MunicipioRepository } from "./ports/municipios.repository";

export class GetMunicipiosPorEntidadInteractor implements UseCase<number, ResponseApi<Municipio[]>> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(payload: number): Promise<ResponseApi<Municipio[]>> {
        return this.municipioRepository.getMunicipiosPorEntidad(payload);
    }
}