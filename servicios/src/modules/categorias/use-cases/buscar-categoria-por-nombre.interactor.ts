import { UseCase } from "../../../kernel/contracts";
import { RegistrarCategoriaDTO } from "../adapters/dtos/registrar-categoria.dto";
import { categoria } from "../entities/categoria";
import { CategoriaRepository } from "./ports/categoria.repository";

export class BuscarCategoriaPorNombreInteractor implements UseCase<RegistrarCategoriaDTO, categoria[] | null> {
    constructor(private readonly repository: CategoriaRepository) {}

    async execute(payload: RegistrarCategoriaDTO): Promise<categoria[] | null> {
        return this.repository.buscarCategoriaPorNombre(payload);
    }
}