import { UseCase } from "../../../kernel/contracts";
import { UsuarioRepository } from "./ports/usuario.repository";
import { ModificarInformacionOpinionesDTO } from "../adapters/dtos/modificar-informacion-opiniones.dto";

export class ModificarInformacionOpinionesInteractor implements UseCase<ModificarInformacionOpinionesDTO, boolean> {
    constructor(private readonly repository: UsuarioRepository) { }

    async execute(payload: ModificarInformacionOpinionesDTO): Promise<boolean> {
        if (!payload.usuario|| !payload.fecha_opinion) {
            throw new Error("Campos requeridos incompletos");
        }

        return this.repository.modificarInformacionOpiniones(payload);
    }
}