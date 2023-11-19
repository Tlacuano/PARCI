import { UseCase } from "src/kernel/contracts";
import { RegistrarMunicipioDTO } from "../adapters/dtos/registrar-municipio.dto";
import { MunicipioRepository } from "./ports/municipio.repository";
import { nombreRepetidoMunicipio } from "../utils/nombre-repetido-municipio";
import { regexValidationNoCaracteresEspeciales, validateRegex, regexValidationNoEspaciosInicioFin} from "src/kernel/validation";

export class RegistrarMunicipioInteractor implements UseCase<RegistrarMunicipioDTO, boolean> {
    constructor(private readonly repository: MunicipioRepository) {}

    async execute(payload: RegistrarMunicipioDTO): Promise<boolean> {
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
        
        return await this.repository.registrarMunicipio(payload);
    }
}