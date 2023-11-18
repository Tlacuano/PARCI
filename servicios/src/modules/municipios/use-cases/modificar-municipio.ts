import { UseCase } from "src/kernel/contracts";
import { MunicipioRepository } from "./ports/municipio.repository";
import { ModificarMunicipioDTO } from "../adapters/dtos/modificar-municipio.dto";

export class ModificarMunicipioInteractor implements UseCase<ModificarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: ModificarMunicipioDTO): Promise<boolean> {
        payload.nombre_municipio = payload.nombre_municipio.trim();
        if (payload.nombre_municipio === "") {
            throw new Error("El nombre del muncipio no puede estar vacio");
        }

        if (!payload.fk_idEntidad) {
            throw new Error("Debe indicar a que Entidad Federativa pertenerce el municipio");
        }
        
        return this.repository.modificarMunicipio(payload);
    }
}