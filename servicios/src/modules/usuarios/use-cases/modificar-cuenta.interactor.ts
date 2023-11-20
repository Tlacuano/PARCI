import { UseCase } from "src/kernel/contracts";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";
import { ModificarCuentaDTO } from "../adapters/dtos/modificar-cuenta.dto";

export class ModificarCuentaInteractor implements UseCase<ModificarCuentaDTO, boolean> {
    constructor(private readonly repository: UsuarioRepository) { }

    async execute(payload: ModificarCuentaDTO): Promise<boolean> {

        if (!payload.contrasena || !payload.id_usuario) {
            throw new Error("Campos requeridos incompletos");
        }


        return this.repository.modificarCuenta(payload);
    }
}