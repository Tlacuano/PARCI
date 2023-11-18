import { UseCase } from "src/kernel/contracts";
import { Municipio } from "../entities/municipios";
import { MunicipioRepository } from "./ports/municipio.repository";

export class GetMunicipiosPorEntidadInteractor implements UseCase<number, Municipio[]> {
    constructor(private readonly repository: MunicipioRepository) {}
    
    async execute(fk_idEntidad: number): Promise<Municipio[]> {
        if (!fk_idEntidad) {
            throw new Error("Campo requerido incompleto")
        }
        return await this.repository.getMunicipiosPorEntidad(fk_idEntidad);
    }
}