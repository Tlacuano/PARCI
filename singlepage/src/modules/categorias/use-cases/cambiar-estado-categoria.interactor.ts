import { UseCase } from "@/kernel/contracts";
import { CambiarEstadoCategoriaDTO } from "../adapters/dtos/cambiar-estado-categoria.dto";
import { ResponseApi } from "@/kernel/types";
import { CategoriaRepository } from "./ports/categoria.repository";

export class CambiarEstadoCategoriaInteractor implements UseCase<CambiarEstadoCategoriaDTO, ResponseApi<boolean>> {
    constructor(private categoriaRepository: CategoriaRepository) {}
    
    execute(payload: CambiarEstadoCategoriaDTO): Promise<ResponseApi<boolean>> {
        return this.categoriaRepository.cambiarEstadoCategoria(payload);
    }
}
