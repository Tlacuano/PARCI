import { UseCase } from "../../../kernel/contracts";
import { categoria } from "../entities/categoria";
import { CategoriaRepository } from "./ports/categoria.repository";


export class GetCategoriasInteractor implements UseCase<null, categoria[]>{
    constructor(private categoriaRepository:CategoriaRepository){}

    async execute(payload: null): Promise<categoria[]> {
        return await this.categoriaRepository.getCategoria();
    }

}