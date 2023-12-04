import { ResponseApi } from "@/kernel/types";
import { Persona } from "../../entities/persona";
import { RegistrarPersonaDTO } from "../../adapters/dtos/registrar-persona.dto";
import { ModificarInformacionPersonaDTO } from "../../adapters/dtos/modificar-informacion-persona.dto";
import { EliminarPersonaDTO } from "../../adapters/dtos/eliminar-persona.dto";




export interface PersonaRepository {
    getPersonas(): Promise<ResponseApi<Persona[]>>;
    registrarPersona(payload: RegistrarPersonaDTO): Promise<ResponseApi<boolean>>;
    modificarInformacionPersona(payload: ModificarInformacionPersonaDTO): Promise<ResponseApi<boolean>>;
    eliminarPersona(payload: EliminarPersonaDTO): Promise<ResponseApi<boolean>>;
}