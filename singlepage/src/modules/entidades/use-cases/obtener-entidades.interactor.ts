import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class ObtenerEntidadesFederativasInteractor implements UseCase<void, ResponseApi<EntidadFederativa[]>> {
  constructor(private entidadFederativaRepository: EntidadFederativaRepository) {}

  execute(): Promise<ResponseApi<EntidadFederativa[]>> {
    return this.entidadFederativaRepository.obtenerEntidadesFederativas();
  }
}
