import { categoria } from "../../entities/categoria";
import { insertCategoriaDto } from "../../adapters/dtos/insert-categoria.dto";
import { modifyCategoriaDTO } from "../../adapters/dtos/modify-categoria.dto";

export interface CategoriaRepository {
    getCategoria():Promise<categoria[]>
    insertCategoria(payload: insertCategoriaDto): Promise<boolean>;
    modificarCategoria(payload: modifyCategoriaDTO): Promise<boolean>;
}