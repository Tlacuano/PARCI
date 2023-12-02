import { ResponseApi } from "@/kernel/types";
import { EntidadFederativa } from "../../entities/entidad-federativa";
import { RegistrarEntidadDTO } from "../../adapters/dtos/registrar-entidad.dto";
import { CambiarEstadoEntidadDTO } from "../../adapters/dtos/cambiar-estado-entidad.dto";
import { ModificarEntidadDTO } from "../../adapters/dtos/modificar-entidad.dto";

export interface EntidadFederativaRepository {
  obtenerEntidadesFederativas(): Promise<ResponseApi<EntidadFederativa[]>>;
  registrarEntidadFederativa(payload: RegistrarEntidadDTO): Promise<ResponseApi<boolean>>;
  modificarEntidadFederativa(payload: ModificarEntidadDTO): Promise<ResponseApi<boolean>>;
  cambiarEstadoEntidadFederativa(payload: CambiarEstadoEntidadDTO): Promise<ResponseApi<boolean>>;
}
