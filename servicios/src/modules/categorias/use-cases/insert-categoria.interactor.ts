import { UseCase } from "src/kernel/contracts";
import { insertCategoriaDto } from "../adapters/dtos/insert-categoria.dto";
import { CategoriaRepository } from "./ports/categoria.repository";
import { categoria } from "../entities/categoria";

export class InsertCategoriaInteractor implements UseCase<insertCategoriaDto, boolean> {
    constructor(private categoriaRepository: CategoriaRepository) {}

    async execute(payload: insertCategoriaDto): Promise<boolean> {
        return this.categoriaRepository.insertCategoria(payload);
    }
}