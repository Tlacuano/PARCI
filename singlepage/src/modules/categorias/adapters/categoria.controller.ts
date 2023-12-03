import { ResponseApi } from "@/kernel/types";
import { GetCategoriasInteractor } from "../use-cases/get-categorias.interactor";
import { CategoriaRepository } from "../use-cases/ports/categoria.repository";
import { CategoriaStorageGateway } from "./categoria-storage-gateway";
import { categoria } from "../entities/categoria";
import { insertCategoriaDto } from "./dtos/insert-categoria.dto";
import { RegistrarCategoriaInteractor } from "../use-cases/registrar-categoria.interactor";
//import { modifyCategoriaDTO } from "./dtos/modify-categoria.dto";
//import { ModificarCategoriaInteractor } from "../use-cases/modificar-categoria.interactor";

export class CategoriaController {

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
  }

  getCategorias() {
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
  }

  registrarCategoria = async (payload: insertCategoriaDto) => {
    try {
      const repository: CategoriaRepository = new CategoriaStorageGateway();
      const registrarCategoriaInteractor = new RegistrarCategoriaInteractor(
        repository
      );

      const respuesta = await registrarCategoriaInteractor.execute(payload);
      return respuesta;
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        error: true,
      } as ResponseApi<boolean>;
    }
  }

  /*
  modificarCategoria = async (payload: modifyCategoriaDTO) => {
    try {
        const repository: CategoriaRepository = new CategoriaStorageGateway();
        const modificarCategoriaInteractor = new ModificarCategoriaInteractor(repository);
        const respuesta = await modificarCategoriaInteractor.execute(payload);
        return respuesta;
    } catch (error: any) {
        return {
            status: 500,
            message: error.message,
            error: true,
          } as ResponseApi<boolean>;
    }
  }
*/

}
