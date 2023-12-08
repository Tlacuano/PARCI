import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { MunicipioRepository } from "./ports/municipios.repository";
import { MunicipioActivo } from "../adapters/dtos/municipio-activo.dto";

export class GetMunicipiosActivosInteractor implements UseCase<void, ResponseApi<MunicipioActivo[]>> {
    constructor(private repository: MunicipioRepository) {}

    async execute(): Promise<ResponseApi<MunicipioActivo[]>> {
        return await this.repository.getMunicipiosActivos();
    }
}