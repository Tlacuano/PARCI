import { ResponseApi } from "@/kernel/types";
import { categoria  } from "../../entities/categoria";
import { insertCategoriaDto } from "../../adapters/dtos/insert-categoria.dto";
//import { modifyCategoriaDTO } from "../../adapters/dtos/modify-categoria.dto";

export interface CategoriaRepository {
    getCategorias(): Promise<ResponseApi<categoria[]>>;
    registrarCategoria(payload: insertCategoriaDto): Promise<ResponseApi<boolean>>;
    //modificarCategoria(payload: modifyCategoriaDTO): Promise<ResponseApi<boolean>>;
}