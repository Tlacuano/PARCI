import { UseCase } from "@/kernel/contracts";
import { CambiarEstadoEntidadDTO } from "../adapters/dtos/cambiar-estado-entidad.dto";
import { ResponseApi } from "@/kernel/types";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class CambiarEstadoEntidadFederativaInteractor implements UseCase<CambiarEstadoEntidadDTO, ResponseApi<boolean>> {
    constructor(private entidadFederativaRepository: EntidadFederativaRepository) {}
    
    execute(payload: CambiarEstadoEntidadDTO): Promise<ResponseApi<boolean>> {
        return this.entidadFederativaRepository.cambiarEstadoEntidadFederativa(payload);
    }
}
