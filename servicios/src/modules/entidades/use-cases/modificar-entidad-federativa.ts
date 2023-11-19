import { UseCase } from "src/kernel/contracts";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { ModificarEntidadFederativaDTO } from "../adapters/dtos/modificar-entidad-federativa.dto";
import { nombreRepetido } from "../utils/nombre-repetido";

export class ModificarEntidadFederativaInteractor implements UseCase<ModificarEntidadFederativaDTO, boolean> {
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(payload: ModificarEntidadFederativaDTO): Promise<boolean> {
    payload.nombre_entidad = payload.nombre_entidad.trim();
    if (await nombreRepetido(payload.nombre_entidad)) {
      throw new Error("El nombre ya existe");
    }
    if (payload.nombre_entidad === "") {
      throw new Error("El nombre es requerido");
    }

    return this.repository.modificarEntidadFederativa(payload);
  }
}
