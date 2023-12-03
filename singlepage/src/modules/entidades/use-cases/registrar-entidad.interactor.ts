import { UseCase } from "@/kernel/contracts";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { RegistrarEntidadDTO } from "../adapters/dtos/registrar-entidad.dto";
import { ResponseApi } from "@/kernel/types";
import { EntidadFederativaRepository } from "./ports/entidad-federativa.repository";

export class RegistrarEntidadFederativaInteractor implements UseCase<RegistrarEntidadDTO, ResponseApi<boolean>> {
    constructor(private entidadFederativaRepository: EntidadFederativaRepository) {}
    
    execute(payload: RegistrarEntidadDTO): Promise<ResponseApi<boolean>> {
        return this.entidadFederativaRepository.registrarEntidadFederativa(payload);
    }
}