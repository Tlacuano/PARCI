import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { ModificarEntidadDTO } from "../adapters/dtos/modificar-entidad.dto";

export class ModificarEntidadFederativaInteractor implements UseCase<ModificarEntidadDTO, ResponseApi<boolean>> {
  constructor(private entidadFederativaRepository: EntidadFederativaRepository) {}

  execute(payload: ModificarEntidadDTO): Promise<ResponseApi<boolean>> {
    return this.entidadFederativaRepository.modificarEntidadFederativa(payload);
  }
}
