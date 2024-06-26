import { UseCase } from "../../../kernel/contracts";
import { modifyCategoriaDTO } from "../adapters/dtos/modify-categoria.dto";
import { CategoriaRepository } from "./ports/categoria.repository";
import { nombreCategoriaExistente } from "../utils/nombre-categoria-existente";
import { colorCategoriaExistente } from "../utils/color-categoria-existente";
import { regexValidationCodigoHexadecimal, validateRegex } from "../../../kernel/validation";

export class ModificarCategoriaInteractor implements UseCase<modifyCategoriaDTO, boolean> {
    constructor(private readonly repository: CategoriaRepository) { }

    async execute(payload: modifyCategoriaDTO): Promise<boolean> {
        if(!payload.id_categoria){
            throw new Error("El id de la categoria es requerido");
        }
        
        if (await nombreCategoriaExistente(payload.nombre_categoria)) {
            throw new Error("El nombre de la categoria ya existe");
        }

        if (await colorCategoriaExistente(payload.color)) {
            throw new Error("El color de la categoria ya existe");
        }

        if (!validateRegex(regexValidationCodigoHexadecimal, payload.color)) {
            throw new Error("El color de la categoria debe de seguir el orden de un codigo hexadecimal");
        }
        
        return this.repository.modificarCategoria(payload);
    }
}