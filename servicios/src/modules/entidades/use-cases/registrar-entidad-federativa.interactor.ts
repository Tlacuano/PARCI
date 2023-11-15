import { UseCase } from "src/kernel/contracts";
import { RegistrarEntidadFederativaDTO } from "../adapters/dtos/registrar-entidad-federativa.dto";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class RegistrarEntidadFederativaInteractor
  implements UseCase<RegistrarEntidadFederativaDTO, boolean>
{
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(payload: RegistrarEntidadFederativaDTO): Promise<boolean> {
    return await this.repository.registrarEntidadFederativa(payload);
  }
}
