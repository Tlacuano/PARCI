import { ResponseApi } from "@/kernel/types";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import api from "../../../config/http-client.gateway";
import { RegistrarEntidadDTO } from "./dtos/registrar-entidad.dto";

export class EntidadFederativaStorageGateway implements EntidadFederativaRepository {
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
