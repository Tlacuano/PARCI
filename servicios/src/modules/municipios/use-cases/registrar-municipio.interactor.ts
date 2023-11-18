import { UseCase } from "src/kernel/contracts";
import { RegistrarMunicipioDTO } from "../adapters/dtos/registrar-municipio.dto";
import { MunicipioRepository } from "./ports/municipio.repository";

export class RegistrarMunicipioInteractor implements UseCase<RegistrarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: RegistrarMunicipioDTO): Promise<boolean> {
        payload.nombre_municipio = payload.nombre_municipio.trim();
        if (payload.nombre_municipio === "") {
            throw new Error("El nombre del muncipio no puede estar vacio");
        }

        if (!payload.fk_idEntidad) {
            throw new Error("Debe indicar a que Entidad Federativa pertenerce el municipio");
        }
        
        return await this.repository.registrarMunicipio(payload);
    }
}