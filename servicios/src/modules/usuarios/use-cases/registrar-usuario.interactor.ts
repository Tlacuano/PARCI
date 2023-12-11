import { UseCase } from "src/kernel/contracts";
import { RegistrarUsuarioDTO } from "../adapters/dtos/registrar-usuario.dto";
import { UsuarioRepository } from "./ports/usuario.repository";
import { RegistrarPersonaDTO } from "../../../modules/persona/adapters/dtos/registrar-persona.dto";
import { encriptar } from "../../../kernel/bcrypt";

export class RegistrarUsuarioInteractor
    implements UseCase<RegistrarPersonaDTO, boolean>
    {
    constructor(private readonly repository: UsuarioRepository) {}
    
    async execute(payload: RegistrarPersonaDTO): Promise<boolean> {

        if (!payload.usuario.contrasena || !payload.usuario.contrasena) {
            throw new Error("Campos requeridos incompletos");
        }

        if (payload.usuario.contrasena.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres");
        }

        if (payload.usuario.usuario.length < 6) {
            throw new Error("El usuario debe tener al menos 6 caracteres");
        }

        const existeUsuario = await this.repository.existeUsuario(payload.usuario.usuario);

        if (existeUsuario) {
            throw new Error("El usuario ya existe");
        }


        payload.usuario.contrasena.trim();
        
        payload.usuario.contrasena = await encriptar(payload.usuario.contrasena);

       
        return await this.repository.registrarUsuario(payload);
    }
    }