import { ModificarInformacionPersonaDTO } from "../../adapters/dtos/modificar-informacion-persona.dto";
import { EliminarPersonaDTO } from "../../adapters/dtos/eliminar-persona.dto";
import { RegistrarPersonaDTO } from "../../adapters/dtos/registrar-persona.dto";
import { Persona } from "../../entities/persona";
import { ModificarCuentaPersonaDTO } from "../../adapters/dtos/modificar-persona.dto";

export interface PersonaRepository {
    getPersonas(): Promise<Persona[]>;
    registrarPersona(payload: RegistrarPersonaDTO): Promise<number>;
    modificarInformacionPersona(payload: ModificarInformacionPersonaDTO): Promise<boolean>;
    eliminarPersona(payload: EliminarPersonaDTO): Promise<boolean>;
    getPersonaInfoByUsuario(usuario: string): Promise<Persona>;
    modificarPersona(payload: ModificarCuentaPersonaDTO): Promise<boolean>;

}