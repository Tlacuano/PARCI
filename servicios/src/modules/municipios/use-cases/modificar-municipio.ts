import { UseCase } from "../../../kernel/contracts";
import { MunicipioRepository } from "./ports/municipio.repository";
import { ModificarMunicipioDTO } from "../adapters/dtos/modificar-municipio.dto";
import { regexValidationNoCaracteresEspeciales, regexValidationNoEspaciosInicioFin, validateRegex } from "../../../kernel/validation";

export class ModificarMunicipioInteractor implements UseCase<ModificarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: ModificarMunicipioDTO): Promise<boolean> {
        if (!payload.id_municipio) {
            throw new Error("El id es requerido");
        }

        if (payload.nombre_municipio === "") {
            throw new Error("El nombre del muncipio no puede estar vacio");
        }

        if (!payload.fk_idEntidad) {
            throw new Error("Debe indicar a que Entidad Federativa pertenerce el municipio");
        }

        if (!validateRegex(regexValidationNoCaracteresEspeciales, payload.nombre_municipio)) {
            throw new Error("El nombre del muncipio no puede contener caracteres especiales");
        }

        if (!validateRegex(regexValidationNoEspaciosInicioFin, payload.nombre_municipio)) {
            throw new Error("El nombre del muncipio no puede contener esapcion al principio ni al final");
        }
        
        return this.repository.modificarMunicipio(payload);
    }
}