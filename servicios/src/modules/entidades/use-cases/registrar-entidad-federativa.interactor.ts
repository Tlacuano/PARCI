import { UseCase } from "../../../kernel/contracts";
import { RegistrarEntidadFederativaDTO } from "../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { nombreRepetido } from "../utils/nombre-repetido";
import { regexValidationNoCaracteresEspeciales, validateRegex } from "../../../kernel/validation";

export class RegistrarEntidadFederativaInteractor implements UseCase<RegistrarEntidadFederativaDTO, boolean> {
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(payload: RegistrarEntidadFederativaDTO): Promise<boolean> {
    payload.nombre_entidad = payload.nombre_entidad.trim();
    if (await nombreRepetido(payload.nombre_entidad)) {
      throw new Error("El nombre ya existe");
    }
    if (!validateRegex(regexValidationNoCaracteresEspeciales, payload.nombre_entidad)) {
      throw new Error("El nombre no debe contener caracteres especiales");
    }
    if (payload.nombre_entidad === "") {
      throw new Error("El nombre es requerido");
    }

    return await this.repository.registrarEntidadFederativa(payload);
  }
}
