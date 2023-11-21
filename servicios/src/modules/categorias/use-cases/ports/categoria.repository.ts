import { categoria } from "../../entities/categoria";
import { insertCategoriaDto } from "../../adapters/dtos/insert-categoria.dto";
import { modifyCategoriaDTO } from "../../adapters/dtos/modify-categoria.dto";
import { modificarEstadoCategoriaDTO } from "../../adapters/dtos/modificar-estado-categoria";
import { RegistrarCategoriaDTO } from "../../adapters/dtos/registrar-categoria.dto";

export interface CategoriaRepository {
    getCategoria():Promise<categoria[]>;
    insertCategoria(payload: insertCategoriaDto): Promise<boolean>;
    modificarCategoria(payload: modifyCategoriaDTO): Promise<boolean>;
    modificarEstadoCategoria(payload: modificarEstadoCategoriaDTO):Promise<boolean>;
    buscarCategoriaPorNombre(payload:RegistrarCategoriaDTO):Promise<categoria[] | null>;
}