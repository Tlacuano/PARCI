import { UseCase } from "src/kernel/contracts";
import { insertCategoriaDto } from "../adapters/dtos/insert-categoria.dto";
import { CategoriaRepository } from "./ports/categoria.repository";
import { nombreCategoriaExistente } from "../utils/nombre-categoria-existente";
import { colorCategoriaExistente } from "../utils/color-categoria-existente";

export class InsertCategoriaInteractor implements UseCase<insertCategoriaDto, boolean> {
    constructor(private readonly categoriaRepository: CategoriaRepository) {}

    async execute(payload: insertCategoriaDto): Promise<boolean> {
        
        if(payload.nombre_categoria === ""){
            throw new Error("El nombre de la categoria es requerido");
        }

        if (await nombreCategoriaExistente(payload.nombre_categoria)) {
            throw new Error("El nombre de la categoria ya existe");
        }

        if (await colorCategoriaExistente(payload.color)) {
            throw new Error("El color de la categoria ya existe");
        }

        return await this.categoriaRepository.insertCategoria(payload);
    }
}