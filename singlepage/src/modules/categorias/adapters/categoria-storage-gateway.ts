import { ResponseApi } from "@/kernel/types";
import { categoria } from "../entities/categoria";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import api from "@/config/http-client.gateway";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { CambiarEstadoCategoriaDTO } from "./dtos/cambiar-estado-categoria.dto";

export class CategoriaStorageGateway implements CategoriaRepository {
  async getCategorias(): Promise<ResponseApi<categoria[]>> {
    const respuesta = await api.doGet("/categorias/consultar");
    return {
      ...respuesta.data,
    } as ResponseApi<categoria[]>;
  }

  async registrarCategoria(
    payload: insertCategoriaDto
  ): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPost("/categorias/registrar", payload);
    return { ...respuesta.data, } as ResponseApi<boolean>;
  }

  async modificarCategoria(
    payload: modifyCategoriaDTO
  ): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPut("/categorias/modificar", payload);
    return { ...respuesta.data } as ResponseApi<boolean>;
  }

  async cambiarEstadoCategoria(payload: CambiarEstadoCategoriaDTO): Promise<ResponseApi<boolean>> {
    const respuesta = await api.doPut("/categorias/modificar-estado", payload);
    return {
      ...respuesta.data,
    } as ResponseApi<boolean>;
  }

}
