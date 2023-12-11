import { UseCase } from "@/kernel/contracts";
import { ModificarCuentaDTO } from "../adapters/dtos/modificar-cuenta.dto";
import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "./ports/usuario.repository";
import { regexValidationAlMenosUnaMayuscula, regexValidationUnAlMenosNumero } from "@/kernel/validation";


export class ModificarCuentaInteractor implements UseCase<ModificarCuentaDTO, ResponseApi<boolean>>{
    constructor (private usuarioRepository : UsuarioRepository) { }


    execute(payload: ModificarCuentaDTO): Promise<ResponseApi<boolean>> {


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



        return this.usuarioRepository.modificarCuenta(payload);
    }

}