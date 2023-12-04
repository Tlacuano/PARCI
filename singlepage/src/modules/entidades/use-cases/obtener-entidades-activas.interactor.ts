import { UseCase } from "@/kernel/contracts";
import { EntidadFederativaActiva } from "../adapters/dtos/entidad-federativa-activa";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";
import { ResponseApi } from '@/kernel/types';

export class ObtenerEntidadesFederativasActivasInteractor implements UseCase<void, ResponseApi<EntidadFederativaActiva[]>> {
  constructor(private repository: EntidadFederativaRepository) {}

  async execute(): Promise<ResponseApi<EntidadFederativaActiva[]>> {
    return await this.repository.obtenerEntidadesFederativasActivas();
  }
}