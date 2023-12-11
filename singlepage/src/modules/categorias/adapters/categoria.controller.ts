import { ResponseApi } from "@/kernel/types";
import { GetCategoriasInteractor } from "../use-cases/get-categorias.interactor";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { CategoriaStorageGateway } from "./categoria-storage-gateway";
import { categoria } from "../entities/categoria";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { RegistrarCategoriaInteractor } from "../use-cases/registrar-categoria.interactor";
import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
import { ModificarCategoriaInteractor } from "../use-cases/modificar-categoria.interactor";
import { CambiarEstadoCategoriaDTO } from "./dtos/cambiar-estado-categoria.dto";
import { CambiarEstadoCategoriaInteractor } from "../use-cases/cambiar-estado-categoria.interactor";

export class CategoriaController {
  private obtenerError(error: any) {
    return {
      status: error.status,
      error: true,
      message: error.message,
    } as ResponseApi<any>;
  }

  static getCategorias_local = async () => {
    try {
      const repository: CategoriaRepository = new CategoriaStorageGateway();
      const interactor: GetCategoriasInteractor = new GetCategoriasInteractor(
        repository
      );
      return interactor.execute();
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        error: true,
      } as ResponseApi<categoria[]>;
    }
  };

  getCategorias = async () => {
    try {
      const repository: CategoriaRepository = new CategoriaStorageGateway();
      const obtenerCategoriasInteractor: GetCategoriasInteractor =
        new GetCategoriasInteractor(repository);
      const respuesta = await obtenerCategoriasInteractor.execute();
      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

  registrarCategoria = async (payload: insertCategoriaDto) => {
    try {
      const repository: CategoriaRepository = new CategoriaStorageGateway();
      const registrarCategoriaInteractor = new RegistrarCategoriaInteractor(
        repository
      );

      const respuesta = await registrarCategoriaInteractor.execute(payload);
      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

  
  modificarCategoria = async (payload: modifyCategoriaDTO) => {
    try {
        const repository: CategoriaRepository = new CategoriaStorageGateway();
        const modificarCategoriaInteractor = new ModificarCategoriaInteractor(repository);
        const respuesta = await modificarCategoriaInteractor.execute(payload);
        return respuesta;
    } catch (error) {
        return this.obtenerError(error);
    }
  }

  cambiarEstadoCategoria = async (payload: CambiarEstadoCategoriaDTO) => {
    try {
      const repositorio: CategoriaRepository = new CategoriaStorageGateway();
      const cambiarEstadoCategoriaInteractor = new CambiarEstadoCategoriaInteractor(repositorio);

      const respuesta = await cambiarEstadoCategoriaInteractor.execute(payload);

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

}
