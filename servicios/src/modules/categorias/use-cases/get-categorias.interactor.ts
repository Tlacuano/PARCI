import { UseCase } from "../../../kernel/contracts";
import { categoria } from "../entities/categoria";
import { CategoriaRepository } from "./ports/categoria.repository";

export class GetCategoriasInteractor implements UseCase<null, categoria[]>{
    constructor(private categoriaRepsitory:CategoriaRepository){}

    execute(payload: null): Promise<categoria[]> {
        throw new Error("Method not implemented.");
    }

}