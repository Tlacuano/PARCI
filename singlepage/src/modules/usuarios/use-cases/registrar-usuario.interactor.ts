import { UseCase } from "@/kernel/contracts";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { ResponseApi } from "@/kernel/types";
import { UsuarioRepository } from "./ports/usuario.repository";
import { regexValidationAlMenosUnaMayuscula, regexValidationNoCaracteresEspeciales, regexValidationUnAlMenosNumero } from "@/kernel/validation";


export class RegistrarUsuarioInteractor implements UseCase<RegistrarUsuarioDTO, ResponseApi<boolean>>{
    constructor(private usuarioRepository : UsuarioRepository) { }

    async execute(payload: RegistrarUsuarioDTO): Promise<ResponseApi<boolean>> {


        if (!payload.usuario || !payload.contrasena) {
            throw new Error("Campos requeridos incompletos");
        }

        if (payload.contrasena.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres");
        }

        if (payload.usuario.length < 6) {
            throw new Error("El usuario debe tener al menos 6 caracteres");
        }

        const existeUsuario = await this.usuarioRepository.existeUsuario(payload.usuario);

        if (existeUsuario) {
            throw new Error("El usuario ya existe");
        }

        if (regexValidationAlMenosUnaMayuscula.test(payload.contrasena)) {
            throw new Error("La contraseña debe tener al menos una mayuscula");
        }

        if (regexValidationUnAlMenosNumero.test(payload.contrasena)) {
            throw new Error("La contraseña debe tener al menos un numero");
        }

        if (payload.contrasena.includes(" ")) {
            throw new Error("La contraseña no debe tener espacios");
        }

        if (regexValidationAlMenosUnaMayuscula.test(payload.usuario)) {
            throw new Error("El usuario debe tener al menos una mayuscula");
        }

        if (regexValidationNoCaracteresEspeciales.test(payload.usuario)) {
            throw new Error("El usuario no debe tener caracteres especiales");
        }




        return await this.usuarioRepository.registrarUsuario(payload);
    }

}