import { UseCase } from "src/kernel/contracts";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaActiva } from "../adapters/dtos/entidad-federativa-activa";

export class GetEntidadesFederativasActivasInteractor implements UseCase<void, EntidadFederativaActiva[]> {
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(): Promise<EntidadFederativaActiva[]> {
    return await this.repository.getEntidadesFederativasActivas();
  }
}
