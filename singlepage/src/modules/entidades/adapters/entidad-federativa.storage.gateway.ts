import { ResponseApi } from "@/kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import api from "../../../config/http-client.gateway";
import { RegistrarEntidadDTO } from "./dtos/registrar-entidad.dto";
import { CambiarEstadoEntidadDTO } from "./dtos/cambiar-estado-entidad.dto";
import { ModificarEntidadDTO } from "./dtos/modificar-entidad.dto";

export class EntidadFederativaStorageGateway implements EntidadFederativaRepository {
  async modificarEntidadFederativa(payload: ModificarEntidadDTO): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPut("/entidades-federativas/modificar", payload);
    return {
      ...respuesta.data,
    } as ResponseApi<boolean>;
  }

  async cambiarEstadoEntidadFederativa(payload: CambiarEstadoEntidadDTO): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPut("/entidades-federativas/cambiar-estado", payload);
    return {
      ...respuesta.data,
    } as ResponseApi<boolean>;
  }

  async registrarEntidadFederativa(payload: RegistrarEntidadDTO): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPost("/entidades-federativas/registrar", payload);
    return {
      ...respuesta.data,
    } as ResponseApi<boolean>;
  }

  async obtenerEntidadesFederativas(): Promise<ResponseApi<EntidadFederativa[]>> {
    const respuesta = await api.doGet("/entidades-federativas/consultar");
    return {
      ...respuesta.data,
    } as ResponseApi<EntidadFederativa[]>;
  }
}
