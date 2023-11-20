import { CategoriaRepository } from "./ports/categoria.repository";
import { UseCase } from "../../../kernel/contracts";
import { modificarEstadoCategoriaDTO } from "../adapters/dtos/modificar-estado-categoria";

export class ModificarEstadoCategoriaInteractor implements UseCase<modificarEstadoCategoriaDTO, boolean> {
    constructor(private readonly repository: CategoriaRepository) { }

    async execute(payload: modificarEstadoCategoriaDTO): Promise<boolean> {
    
        if(!payload.id_categoria){
            throw new Error("El id de la categoria es requerido");
        }
        
    return this.repository.modificarEstadoCategoria(payload);
    }
}