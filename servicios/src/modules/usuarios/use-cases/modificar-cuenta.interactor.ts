import { UseCase } from "src/kernel/contracts";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "./ports/usuario.repository";
import { ModificarCuentaDTO } from "../adapters/dtos/modificar-cuenta.dto";
import { regexValidationAlMenosUnaMayuscula, regexValidationUnAlMenosNumero } from "../../../kernel/validation";

export class ModificarCuentaInteractor implements UseCase<ModificarCuentaDTO, boolean> {
    constructor(private readonly repository: UsuarioRepository) { }

    async execute(payload: ModificarCuentaDTO): Promise<boolean> {

        if (!payload.contrasena || !payload.id_usuario) {
            throw new Error("Campos requeridos incompletos");
        }

        if (payload.contrasena.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres");
        }

        if (payload.contrasena.includes(" ")) {
            throw new Error("La contraseña no debe tener espacios");
        }

        if (regexValidationAlMenosUnaMayuscula.test(payload.contrasena)) {
            throw new Error("La contraseña debe tener al menos una mayuscula");
        }

        if (regexValidationUnAlMenosNumero.test(payload.contrasena)) {
            throw new Error("La contraseña debe tener al menos un numero");
        }





        return this.repository.modificarCuenta(payload);
    }
}