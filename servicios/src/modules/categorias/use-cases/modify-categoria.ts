import { UseCase } from "src/kernel/contracts";
import { modifyCategoriaDTO } from "../adapters/dtos/modify-categoria.dto";
import { CategoriaRepository } from "./ports/categoria.repository";

export class ModificarCategoriaInteractor implements UseCase<modifyCategoriaDTO, boolean> {
    constructor(private readonly repository: CategoriaRepository) { }

    async execute(payload: modifyCategoriaDTO): Promise<boolean> {
        return this.repository.modificarCategoria(payload);
    }
}