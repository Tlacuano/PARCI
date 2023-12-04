import { ResponseApi } from "@/kernel/types";
import { UseCase } from "@/kernel/contracts";
import { Municipio } from "../entities/municipio";
import { MunicipioRepository } from "./ports/municipios.repository";

export class BuscarMunicipioPorNombreInteractor implements UseCase<string, ResponseApi<Municipio[]> | null> {
    constructor(private municipioRepository: MunicipioRepository) {}

    execute(payload: string): Promise<ResponseApi<Municipio[]> | null> {
        return this.municipioRepository.buscarMunicipioPorNombre(payload);
    }
}