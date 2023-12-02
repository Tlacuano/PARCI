import { ResponseApi } from "@/kernel/types";
import { EntidadFederativa } from "../../entities/entidad-federativa";
import { RegistrarEntidadDTO } from "../../adapters/dtos/registrar-entidad.dto";
import { CambiarEstadoEntidadDTO } from "../../adapters/dtos/cambiar-estado-entidad.dto";

export interface EntidadFederativaRepository {
    obtenerEntidadesFederativas(): Promise<ResponseApi<EntidadFederativa[]>>;
    registrarEntidadFederativa(payload: RegistrarEntidadDTO): Promise<ResponseApi<boolean>>;
    cambiarEstadoEntidadFederativa(payload: CambiarEstadoEntidadDTO): Promise<ResponseApi<boolean>>;
}