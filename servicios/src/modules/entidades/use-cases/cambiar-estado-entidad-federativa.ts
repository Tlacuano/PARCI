import { UseCase } from "src/kernel/contracts";
import { CambiarEstadoEntidadFederativaDTO } from "../adapters/dtos/cambiar-estado-entidad-federativa.dto";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class CambiarEstadoEntidadFederativaInteractor implements UseCase<CambiarEstadoEntidadFederativaDTO, boolean> {
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(payload: CambiarEstadoEntidadFederativaDTO): Promise<boolean> {
    if (payload.estado !== 0 && payload.estado !== 1) {
      throw new Error("Estado inválido");
    }

    return this.repository.cambiarEstadoEntidadFederativa(payload);
  }
}
