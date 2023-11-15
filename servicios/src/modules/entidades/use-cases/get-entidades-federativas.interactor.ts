import { UseCase } from "../../../kernel/contracts";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class GetEntidadesFederativasInteractor
  implements UseCase<void, EntidadFederativa[]>
{
  constructor(private readonly repository: EntidadFederativaRepository) {}

  async execute(): Promise<EntidadFederativa[]> {
    return await this.repository.getEntidadesFederativas();
  }
}
