import { UseCase } from "@/kernel/contracts";
import { ResponseApi } from "@/kernel/types";
import { insertCategoriaDto } from "../adapters/dtos/insert-categoria.dto";
import { CategoriaRepository } from "./ports/categoria.repository";

export class RegistrarCategoriaInteractor implements UseCase<insertCategoriaDto, ResponseApi<boolean>> {
    constructor(private repository: CategoriaRepository){}

    execute(payload: insertCategoriaDto): Promise<ResponseApi<boolean>> {
        return this.repository.registrarCategoria(payload);
    }
}