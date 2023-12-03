/*import { ResponseApi } from "../../../kernel/types";
import { UseCase } from "../../../kernel/contracts";
import { CategoriaRepository } from "./ports/categoria.repository";
import { insertCategoriaDto } from "../adapters/dtos/insert-categoria.dto";
//import { modifyCategoriaDTO } from "../adapters/dtos/modify-categoria.dto";



export class ModificarCategoriaInteractor implements UseCase<insertCategoriaDto, ResponseApi<boolean>>{
        
        constructor(private categoriaRepository: CategoriaRepository) {}
    
        execute(payload: insertCategoriaDto): Promise<ResponseApi<boolean>> {
            return this.categoriaRepository.insertCategoriaDto(payload);
        }
}*/