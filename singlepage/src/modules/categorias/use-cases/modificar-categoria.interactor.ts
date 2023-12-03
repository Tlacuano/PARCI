import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { CategoriaRepository } from "./ports/categoria.repository";
import { modifyCategoriaDTO } from "../adapters/dtos/modify-categoria.dto";



export class ModificarCategoriaInteractor implements UseCase<modifyCategoriaDTO, ResponseApi<boolean>>{
        
        constructor(private categoriaRepository: CategoriaRepository) {}
    
        execute(payload: modifyCategoriaDTO): Promise<ResponseApi<boolean>> {
            return this.categoriaRepository.modificarCategoria(payload);
        }
}